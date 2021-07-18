"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = __importDefault(require("bluebird"));
var _1 = require(".");
var Parser = (function () {
    function Parser(stream) {
        this.stream = stream;
        this.ended = false;
    }
    Parser.prototype.readBytes = function (howMany) {
        var _this = this;
        var tryRead, errorListener, endListener;
        return new bluebird_1.default(function (resolve, reject) {
            tryRead = function () {
                if (howMany) {
                    var chunk = void 0;
                    if (chunk = _this.stream.read(howMany)) {
                        howMany -= chunk.length;
                        if (howMany === 0) {
                            return resolve(chunk);
                        }
                    }
                    if (_this.ended) {
                        return reject(new _1.PrematureEOFError(howMany));
                    }
                }
                else {
                    return resolve(Buffer.alloc(0));
                }
            };
            _this.stream.on('readable', tryRead);
            errorListener = function (err) {
                return reject(err);
            };
            _this.stream.on('error', errorListener);
            endListener = function () {
                _this.ended = true;
                return reject(new _1.PrematureEOFError(howMany));
            };
            _this.stream.on('end', endListener);
            tryRead();
        })
            .finally(function () {
            _this.stream.removeListener('readable', tryRead);
            _this.stream.removeListener('error', errorListener);
            return _this.stream.removeListener('end', endListener);
        });
    };
    ;
    Parser.prototype.end = function () {
        var _this = this;
        var tryRead, errorListener, endListener;
        return new bluebird_1.default(function (resolve, reject) {
            tryRead = function () {
                while (_this.stream.read()) {
                    continue;
                }
            };
            _this.stream.on('readable', function () {
                tryRead();
            });
            errorListener = function (err) {
                return reject(err);
            };
            _this.stream.on('error', errorListener);
            endListener = function () {
                _this.ended = true;
                return resolve();
            };
            _this.stream.on('end', endListener);
            if (_this.ended) {
                return resolve();
            }
            _this.stream.read(0);
            _this.stream.end();
        })
            .finally(function () {
            _this.stream.removeListener('readable', tryRead);
            _this.stream.removeListener('error', errorListener);
            return _this.stream.removeListener('end', endListener);
        });
    };
    Parser.prototype.readAscii = function (howMany) {
        return this.readBytes(howMany).then(function (chunk) {
            return chunk.toString('ascii');
        });
    };
    ;
    Parser.prototype.readValue = function () {
        var _this = this;
        return this.readAscii(4)
            .then(function (value) {
            var length = _1.decodeLength(value);
            return _this.readBytes(length);
        });
    };
    Parser.prototype.readError = function () {
        return this.readValue()
            .then(function (value) {
            return bluebird_1.default.reject(new Error(value.toString()));
        });
    };
    Parser.prototype.unexpected = function (data, expected) {
        return bluebird_1.default.reject(new _1.UnexpectedDataError(data, expected));
    };
    Parser.prototype.readByteFlow = function (howMany, targetStream) {
        var _this = this;
        var tryRead, errorListener, endListener;
        return new bluebird_1.default(function (resolve, reject) {
            tryRead = function () {
                var chunk;
                if (howMany) {
                    while (chunk = _this.stream.read(howMany) || _this.stream.read()) {
                        howMany -= chunk.length;
                        targetStream.write(chunk);
                        if (howMany === 0) {
                            return resolve();
                        }
                    }
                    if (_this.ended) {
                        return reject(new _1.PrematureEOFError(howMany));
                    }
                }
                else {
                    return resolve();
                }
            };
            endListener = function () {
                _this.ended = true;
                return reject(new _1.PrematureEOFError(howMany));
            };
            errorListener = function (err) {
                return reject(err);
            };
            _this.stream.on('readable', tryRead);
            _this.stream.on('error', errorListener);
            _this.stream.on('end', endListener);
            tryRead();
        })
            .finally(function () {
            _this.stream.removeListener('readable', tryRead);
            _this.stream.removeListener('error', errorListener);
            return _this.stream.removeListener('end', endListener);
        });
    };
    Parser.prototype.readUntil = function (code) {
        var _this = this;
        var skipped = Buffer.alloc(0);
        var read = function () {
            return _this.readBytes(1).then(function (chunk) {
                if (chunk[0] === code) {
                    return skipped;
                }
                else {
                    skipped = Buffer.concat([skipped, chunk]);
                    return read();
                }
            });
        };
        return read();
    };
    Parser.prototype.readline = function () {
        return this.readUntil(0x0a)
            .then(function (line) {
            if (line[line.length - 1] === 0x0d) {
                return line.slice(0, -1);
            }
            else {
                return line;
            }
        });
    };
    Parser.prototype.searchLine = function (regExp) {
        var _this = this;
        return this.readline()
            .then(function (line) {
            var match;
            if (match = regExp.exec(line.toString())) {
                return match;
            }
            else {
                return _this.searchLine(regExp);
            }
        });
    };
    Parser.prototype.readAll = function () {
        var _this = this;
        var tryRead, errorListener, endListener;
        var all = Buffer.alloc(0);
        return new bluebird_1.default(function (resolve, reject) {
            tryRead = function () {
                var chunk;
                while (chunk = _this.stream.read()) {
                    all = Buffer.concat([all, chunk]);
                }
                if (_this.ended) {
                    return resolve(all);
                }
            };
            _this.stream.on('readable', tryRead);
            errorListener = function (err) {
                return reject(err);
            };
            _this.stream.on('error', errorListener);
            endListener = function () {
                _this.ended = true;
                return resolve(all);
            };
            _this.stream.on('end', endListener);
        })
            .finally(function () {
            _this.stream.removeListener('readable', tryRead);
            _this.stream.removeListener('error', errorListener);
            return _this.stream.removeListener('end', endListener);
        });
    };
    return Parser;
}());
exports.default = Parser;
