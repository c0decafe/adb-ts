"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncMode = void 0;
var events_1 = require("events");
var fs_1 = __importDefault(require("fs"));
var _1 = require(".");
var entry_1 = __importDefault(require("./sync/entry"));
var stats_1 = __importDefault(require("./sync/stats"));
var pushtransfer_1 = __importDefault(require("./sync/pushtransfer"));
var bluebird_1 = __importDefault(require("bluebird"));
var path_1 = __importDefault(require("path"));
var pulltransfer_1 = __importDefault(require("./sync/pulltransfer"));
bluebird_1.default.config({
    cancellation: true,
});
var SyncMode;
(function (SyncMode) {
    SyncMode[SyncMode["DEFAULT_CHMOD"] = 420] = "DEFAULT_CHMOD";
    SyncMode[SyncMode["DATA_MAX_LENGTH"] = 65536] = "DATA_MAX_LENGTH";
})(SyncMode = exports.SyncMode || (exports.SyncMode = {}));
var Sync = (function (_super) {
    __extends(Sync, _super);
    function Sync(connection) {
        var _this = _super.call(this) || this;
        _this.connection = connection;
        _this.parser = connection.getParser();
        return _this;
    }
    Sync.prototype.getConnection = function () {
        return this.connection;
    };
    Sync.temp = function (path) {
        return "/data/local/tmp/" + path_1.default.basename(path);
    };
    Sync.prototype.enoent = function (path) {
        var err = new Error("ENOENT, no such file or directory '" + path + "'");
        err.errno = 34;
        err.code = 'ENOENT';
        err.path = path;
        return bluebird_1.default.reject(err);
    };
    Sync.prototype.readError = function () {
        var _this = this;
        return this.parser.readBytes(4).then(function (length) {
            return _this.parser.readBytes(length.readUInt32LE(0)).then(function (buff) {
                return bluebird_1.default.reject(new _1.FailError(buff.toString()));
            });
        });
    };
    Sync.prototype.sendCommandWithLength = function (cmd, length) {
        var payload = Buffer.alloc(cmd.length + 4);
        payload.write(cmd, 0, cmd.length);
        payload.writeUInt32LE(length, cmd.length);
        return this.connection.write(payload);
    };
    Sync.prototype.writeData = function (stream, timestamp) {
        var _this = this;
        var transfer = new pushtransfer_1.default();
        var connErrorListener, endListener, errorListener, readableListener;
        var writeData = function () {
            return new bluebird_1.default(function (resolve, reject) {
                stream.on('end', (endListener = function () {
                    _this.sendCommandWithLength(_1.Reply.DONE, timestamp);
                    return resolve();
                }));
                stream.on('readable', (readableListener = function () {
                    return writeNext();
                }));
                stream.on('error', (errorListener = function (err) {
                    return reject(err);
                }));
                _this.connection.on('error', (connErrorListener = function (err) {
                    stream.destroy();
                    _this.connection.end();
                    return reject(err);
                }));
                var waitForDrain = function () {
                    var drainListener;
                    return new bluebird_1.default(function (resolve) {
                        _this.connection.on('drain', (drainListener = function () {
                            return resolve();
                        }));
                    }).finally(function () {
                        return _this.connection.removeListener('drain', drainListener);
                    });
                };
                var track = function () {
                    return transfer.pop();
                };
                var writeNext = function () {
                    var chunk = stream.read(SyncMode.DATA_MAX_LENGTH) || stream.read();
                    if (Buffer.isBuffer(chunk)) {
                        _this.sendCommandWithLength(_1.Reply.DATA, chunk.length);
                        transfer.push(chunk.length);
                        if (_this.connection.write(chunk, track)) {
                            return writeNext();
                        }
                        else {
                            return waitForDrain().then(writeNext);
                        }
                    }
                    else {
                        return bluebird_1.default.resolve();
                    }
                };
            }).finally(function () {
                stream.removeListener('end', endListener);
                stream.removeListener('readable', readableListener);
                stream.removeListener('error', errorListener);
                return _this.connection.removeListener('error', connErrorListener);
            });
        };
        var readReply = function () {
            return _this.parser.readAscii(4).then(function (reply) {
                switch (reply) {
                    case _1.Reply.OKAY:
                        return _this.parser.readBytes(4).then(function () {
                            return null;
                        });
                    case _1.Reply.FAIL:
                        return _this.readError();
                    default:
                        return _this.parser.unexpected(reply, 'OKAY or FAIL');
                }
            });
        };
        var writer = writeData()
            .catch(bluebird_1.default.CancellationError, function () {
            return _this.connection.end();
        })
            .catch(function (err) {
            transfer.emit('error', err);
            return reader.cancel();
        });
        var reader = readReply()
            .catch(bluebird_1.default.CancellationError, function (err) {
            _this.emit('error', err);
            return writer.cancel();
        })
            .finally(function () {
            return transfer.end();
        });
        transfer.on('cancel', function () {
            writer.cancel();
            reader.cancel();
        });
        return transfer;
    };
    Sync.prototype.pushStream = function (stream, path, mode) {
        if (mode == null) {
            mode = SyncMode.DEFAULT_CHMOD;
        }
        mode |= stats_1.default.S_IFREG;
        this.sendCommandWithArg(_1.Reply.SEND, path + "," + mode);
        return this.writeData(stream, Math.floor(Date.now() / 1000));
    };
    Sync.prototype.pushFile = function (file, path, mode) {
        if (mode === null) {
            mode = SyncMode.DEFAULT_CHMOD;
        }
        mode = mode || SyncMode.DEFAULT_CHMOD;
        return this.pushStream(fs_1.default.createReadStream(file), path, mode);
    };
    Sync.prototype.push = function (contents, path, mode) {
        if (mode === void 0) { mode = null; }
        if (typeof contents === 'string') {
            return this.pushFile(contents, path, mode);
        }
        else {
            return this.pushStream(contents, path, mode);
        }
    };
    Sync.prototype.readData = function () {
        var _this = this;
        var cancelListener;
        var transfer = new pulltransfer_1.default();
        var readNext = function () {
            return _this.parser.readAscii(4).then(function (reply) {
                switch (reply) {
                    case _1.Reply.DATA:
                        return _this.parser.readBytes(4).then(function (lengthData) {
                            var length = lengthData.readUInt32LE(0);
                            return _this.parser.readByteFlow(length, transfer).then(readNext);
                        });
                    case _1.Reply.DONE:
                        return _this.parser.readBytes(4).return();
                    case _1.Reply.FAIL:
                        return _this.readError();
                    default:
                        return _this.parser.unexpected(reply, 'DATA, DONE or FAIL');
                }
            });
        };
        var reader = readNext()
            .catch(bluebird_1.default.CancellationError, function (err) {
            _this.connection.end();
        })
            .catch(function (err) {
            transfer.emit('error', err);
        })
            .finally(function () {
            transfer.removeListener('cancel', cancelListener);
            return transfer.end();
        });
        transfer.on('cancel', (cancelListener = function () {
            reader.cancel();
        }));
        return transfer;
    };
    Sync.prototype.pull = function (path) {
        this.sendCommandWithArg(_1.Reply.RECV, path);
        return this.readData();
    };
    Sync.prototype.readDir = function (path) {
        var _this = this;
        var files = [];
        var readNext = function () {
            return _this.parser.readAscii(4).then(function (reply) {
                switch (reply) {
                    case _1.Reply.DENT:
                        return _this.parser.readBytes(16).then(function (stat) {
                            var mode = stat.readUInt32LE(0);
                            var size = stat.readUInt32LE(4);
                            var mtime = stat.readUInt32LE(8);
                            var nameLen = stat.readUInt32LE(12);
                            return _this.parser.readBytes(nameLen).then(function (name) {
                                var nameStr = name.toString();
                                if (!(nameStr === '.' || nameStr === '..')) {
                                    files.push(new entry_1.default(nameStr, mode, size, mtime));
                                }
                                return readNext();
                            });
                        });
                    case _1.Reply.DONE:
                        return _this.parser.readBytes(16).then(function () {
                            return files;
                        });
                    case _1.Reply.FAIL:
                        return _this.parser.readError();
                    default:
                        return _this.parser.unexpected(reply, 'DENT, DONE or FAIL');
                }
            });
        };
        this.sendCommandWithArg(_1.Reply.LIST, path);
        return readNext();
    };
    Sync.prototype.end = function () {
        this.connection.end();
        return this;
    };
    Sync.prototype.stat = function (path, cb) {
        var _this = this;
        this.sendCommandWithArg(_1.Reply.STAT, path);
        return this.parser.readAscii(4).then(function (reply) {
            switch (reply) {
                case _1.Reply.STAT:
                    return _this.parser.readBytes(12).then(function (stat) {
                        var mode = stat.readUInt32LE(0);
                        var size = stat.readUInt32LE(4);
                        var mtime = stat.readUInt32LE(8);
                        if (mode === 0) {
                            return _this.enoent(path);
                        }
                        else {
                            return new stats_1.default(mode, size, mtime);
                        }
                    });
                case _1.Reply.FAIL:
                    return _this.readError();
                default:
                    return _this.parser.unexpected(reply, 'STAT or FAIL');
            }
        });
    };
    Sync.prototype.sendCommandWithArg = function (cmd, arg) {
        var arglen = Buffer.byteLength(arg, 'utf-8');
        var payload = Buffer.alloc(cmd.length + 4 + arglen);
        var pos = 0;
        payload.write(cmd, pos, cmd.length);
        pos += cmd.length;
        payload.writeUInt32LE(arglen, pos);
        pos += 4;
        payload.write(arg, pos);
        return this.connection.write(payload);
    };
    return Sync;
}(events_1.EventEmitter));
exports.default = Sync;
