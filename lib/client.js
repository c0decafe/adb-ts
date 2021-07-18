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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sync_1 = __importDefault(require("./sync"));
var child_process_1 = require("child_process");
var fs_1 = __importDefault(require("fs"));
var device_1 = __importDefault(require("./device"));
var baterrystatus_1 = __importDefault(require("./commands/host-trasport/baterrystatus"));
var clear_1 = __importDefault(require("./commands/host-trasport/clear"));
var connect_1 = __importDefault(require("./commands/host/connect"));
var connection_1 = __importDefault(require("./connection"));
var cp_1 = __importDefault(require("./commands/host-trasport/cp"));
var disconnect_1 = __importDefault(require("./commands/host/disconnect"));
var events_1 = require("events");
var filestat_1 = __importDefault(require("./commands/host-trasport/filestat"));
var forward_1 = __importDefault(require("./commands/host-serial/forward"));
var getdevicepath_1 = __importDefault(require("./commands/host-serial/getdevicepath"));
var ipaddress_1 = __importDefault(require("./commands/host-trasport/ipaddress"));
var getproperty_1 = __importDefault(require("./commands/host-trasport/getproperty"));
var getsetting_1 = __importDefault(require("./commands/host-trasport/getsetting"));
var transport_1 = __importDefault(require("./commands/host/transport"));
var input_1 = __importDefault(require("./commands/host-trasport/input"));
var install_1 = __importDefault(require("./commands/host-trasport/install"));
var isinstalled_1 = __importDefault(require("./commands/host-trasport/isinstalled"));
var jimp_1 = __importDefault(require("jimp"));
var kill_1 = __importDefault(require("./commands/host/kill"));
var listdevices_1 = __importDefault(require("./commands/host/listdevices"));
var listfeatures_1 = __importDefault(require("./commands/host-trasport/listfeatures"));
var listforwards_1 = __importDefault(require("./commands/host-serial/listforwards"));
var listpackages_1 = __importDefault(require("./commands/host-trasport/listpackages"));
var listproperties_1 = __importDefault(require("./commands/host-trasport/listproperties"));
var listreverses_1 = __importDefault(require("./commands/host-trasport/listreverses"));
var listsettings_1 = __importDefault(require("./commands/host-trasport/listsettings"));
var logcat_1 = __importDefault(require("./logcat"));
var logcat_2 = __importDefault(require("./commands/host-trasport/logcat"));
var mkdir_1 = __importDefault(require("./commands/host-trasport/mkdir"));
var client_1 = __importDefault(require("./monkey/client"));
var monkey_1 = __importDefault(require("./commands/host-trasport/monkey"));
var mv_1 = __importDefault(require("./commands/host-trasport/mv"));
var parser_1 = __importDefault(require("./parser"));
var bluebird_1 = __importDefault(require("bluebird"));
var putsetting_1 = __importDefault(require("./commands/host-trasport/putsetting"));
var reboot_1 = __importDefault(require("./commands/host-trasport/reboot"));
var remount_1 = __importDefault(require("./commands/host-trasport/remount"));
var reverse_1 = __importDefault(require("./commands/host-trasport/reverse"));
var rm_1 = __importDefault(require("./commands/host-trasport/rm"));
var root_1 = __importDefault(require("./commands/host-trasport/root"));
var screencap_1 = __importDefault(require("./commands/host-trasport/screencap"));
var setproperty_1 = __importDefault(require("./commands/host-trasport/setproperty"));
var shell_1 = __importDefault(require("./commands/host-trasport/shell"));
var shellraw_1 = __importDefault(require("./commands/host-trasport/shellraw"));
var shutdown_1 = __importDefault(require("./commands/host-trasport/shutdown"));
var startactivity_1 = __importDefault(require("./commands/host-trasport/startactivity"));
var startservice_1 = __importDefault(require("./commands/host-trasport/startservice"));
var sync_2 = __importDefault(require("./commands/host-trasport/sync"));
var tcp_1 = __importDefault(require("./commands/host-trasport/tcp"));
var tcpip_1 = __importDefault(require("./commands/host-trasport/tcpip"));
var touch_1 = __importDefault(require("./commands/host-trasport/touch"));
var trackdevices_1 = __importDefault(require("./commands/host/trackdevices"));
var tracker_1 = __importDefault(require("./tracker"));
var uninstall_1 = __importDefault(require("./commands/host-trasport/uninstall"));
var usb_1 = __importDefault(require("./commands/host-trasport/usb"));
var version_1 = __importDefault(require("./commands/host/version"));
var wainbootcomplete_1 = __importDefault(require("./commands/host-trasport/wainbootcomplete"));
var waitfordevice_1 = __importDefault(require("./commands/host/waitfordevice"));
var string_to_stream_1 = __importDefault(require("string-to-stream"));
var AdbClient = (function (_super) {
    __extends(AdbClient, _super);
    function AdbClient(options) {
        var _this = _super.call(this) || this;
        _this.options = options = options || {};
        _this.options.port = options.port || 5037;
        _this.options.host = options.host || 'localhost';
        _this.options.bin = options.bin || 'adb';
        _this.options.noAutoStart =
            options.noAutoStart != undefined ? options.noAutoStart : false;
        return _this;
    }
    AdbClient.prototype.startServer = function (cb) {
        var _this = this;
        var port = this.options.port;
        var args = port
            ? ['-P', port.toString(), 'start-server']
            : ['start-server'];
        return new bluebird_1.default(function (resolve, reject) {
            child_process_1.execFile(_this.options.bin, args, function (err) {
                if (err)
                    return reject(err);
                else
                    return resolve();
            });
        }).nodeify(cb);
    };
    AdbClient.prototype.connection = function () {
        var _this = this;
        var triedStarting = false;
        var connection = new connection_1.default();
        return new bluebird_1.default(function (resolve, reject) {
            connection.connect(_this.options);
            connection.once('connect', function () {
                return resolve(connection);
            });
            connection.on('error', function (err) {
                var _a;
                if (err.code === 'ECONNREFUSED' &&
                    !triedStarting &&
                    !((_a = _this.options) === null || _a === void 0 ? void 0 : _a.noAutoStart)) {
                    triedStarting = true;
                    return _this.startServer().then(function () {
                        return connection.connect(_this.options);
                    });
                }
                else {
                    connection.end();
                    connection.removeAllListeners();
                    return reject(err);
                }
            });
        });
    };
    AdbClient.prototype.transport = function (serial) {
        return this.connection().then(function (conn) {
            return new transport_1.default(conn).execute(serial).return(conn);
        });
    };
    AdbClient.prototype.version = function (cb) {
        return this.connection()
            .then(function (conn) {
            return new version_1.default(conn).execute();
        })
            .nodeify(cb);
    };
    AdbClient.prototype.connect = function (host, port, cb) {
        if (typeof port === 'function') {
            cb = port;
            port = undefined;
        }
        if (host && host.indexOf(':') !== -1) {
            var tmp = host.split(':', 2);
            host = tmp[0];
            port = Number(tmp[1]);
        }
        if (!port)
            port = 5555;
        return this.connection()
            .then(function (conn) {
            return new connect_1.default(conn).execute(host, port);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.disconnect = function (host, port, cb) {
        if (typeof port === 'function') {
            cb = port;
            port = undefined;
        }
        if (host.indexOf(':') !== -1) {
            var tmp = host.split(':', 2);
            host = tmp[0];
            port = Number(tmp[1]);
        }
        if (!port)
            port = 5555;
        return this.connection().then(function (conn) {
            return new disconnect_1.default(conn).execute(host, port);
        });
    };
    AdbClient.prototype.listDevices = function (cb) {
        return this.connection()
            .then(function (conn) {
            return new listdevices_1.default(conn).execute();
        })
            .nodeify(cb);
    };
    AdbClient.prototype.trackDevices = function (cb) {
        var _this = this;
        return this.connection().then(function (conn) {
            var command = new trackdevices_1.default(conn);
            var prom = command
                .execute()
                .then(function () {
                return new tracker_1.default(command, _this);
            })
                .nodeify(cb);
            return prom;
        });
    };
    AdbClient.prototype.kill = function (cb) {
        return this.connection()
            .then(function (conn) {
            return new kill_1.default(conn).execute();
        })
            .nodeify(cb);
    };
    AdbClient.prototype.getSerialNo = function (serial, cb) {
        return this.getProp(serial, 'ro.serialno', cb);
    };
    AdbClient.prototype.getDevicePath = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new getdevicepath_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.listProperties = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new listproperties_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.listFeatures = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new listfeatures_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.listPackages = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new listpackages_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.getIpAddress = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new ipaddress_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.forward = function (serial, local, remote, cb) {
        return this.connection()
            .then(function (conn) {
            return new forward_1.default(conn).execute(serial, local, remote);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.listForwards = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new listforwards_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.reverse = function (serial, local, remote, cb) {
        return this.connection()
            .then(function (conn) {
            return new reverse_1.default(conn).execute(serial, local, remote);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.listReverses = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new listreverses_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.shellInternal = function (serial, command) {
        return this.connection().then(function (conn) {
            return new shellraw_1.default(conn).execute(serial, command);
        });
    };
    AdbClient.prototype.reboot = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new reboot_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.shutdown = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new shutdown_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.remount = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new remount_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.root = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new root_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.screenshot = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new screencap_1.default(conn).execute(serial).then(function (transform) {
                return new bluebird_1.default(function (resolve, reject) {
                    var bufs = [];
                    transform.on('data', function (data) {
                        bufs.push(data);
                    });
                    transform.on('end', function () {
                        jimp_1.default.read(Buffer.concat(bufs)).then(resolve).catch(reject);
                    });
                    transform.on('error', reject);
                });
            });
        })
            .nodeify(cb);
    };
    AdbClient.prototype.openTcp = function (serial, port, host, cb) {
        if (typeof host === 'function') {
            cb = host;
            host = undefined;
        }
        return this.transport(serial)
            .then(function (conn) {
            return new tcp_1.default(conn).execute(port, host);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.roll = function (serial, x, y, source, cb) {
        if (typeof source === 'function') {
            cb = source;
        }
        source = source || 'trackball';
        return this.connection()
            .then(function (conn) {
            return new input_1.default(conn).execute(serial, source, 'roll', x, y);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.press = function (serial, source, cb) {
        if (typeof source === 'function') {
            cb = source;
        }
        source = source || 'trackball';
        return this.connection()
            .then(function (conn) {
            return new input_1.default(conn).execute(serial, source, 'press');
        })
            .nodeify(cb);
    };
    AdbClient.prototype.dragAndDrop = function (serial, x1, y1, x2, y2, options, cb) {
        if (typeof options === 'function' || !options || !options) {
            cb = options;
            options = {};
        }
        options.source = options.source || 'touchscreen';
        return this.connection()
            .then(function (conn) {
            return new input_1.default(conn).execute(serial, options.source, 'draganddrop', x1, y1, x2, y2, options.duration ? options.duration : '');
        })
            .nodeify(cb);
    };
    AdbClient.prototype.swipe = function (serial, x1, y1, x2, y2, options, cb) {
        if (typeof options === 'function' || !options || !options) {
            cb = options;
            options = {};
        }
        options.source = options.source || 'touchscreen';
        return this.connection()
            .then(function (conn) {
            return new input_1.default(conn).execute(serial, options.source, 'swipe', x1, y1, x2, y2, options.duration ? options.duration : '');
        })
            .nodeify(cb);
    };
    AdbClient.prototype.keyEvent = function (serial, code, options, cb) {
        if (typeof options === 'function' || !options || !options) {
            cb = options;
            options = {};
        }
        options.source = options.source || 'keyboard';
        return this.connection()
            .then(function (conn) {
            return new input_1.default(conn).execute(serial, 'keyevent', options.source, code, options.longpress ? '--longpress' : '');
        })
            .nodeify(cb);
    };
    AdbClient.prototype.tap = function (serial, x, y, source, cb) {
        if (typeof source === 'function') {
            cb = source;
        }
        source = source || 'touchscreen';
        return this.connection()
            .then(function (conn) {
            return new input_1.default(conn).execute(serial, source, 'tap', x, y);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.text = function (serial, text, source, cb) {
        if (typeof source === 'function') {
            cb = source;
        }
        source = source || 'touchscreen';
        return this.connection()
            .then(function (conn) {
            return new input_1.default(conn).execute(serial, source, 'text', text);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.openLogcat = function (serial, options, cb) {
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        return this.connection()
            .then(function (conn) {
            return new logcat_2.default(conn)
                .execute(serial, options)
                .then(function (stream) {
                var logCat = logcat_1.default.readStrem(stream, __assign(__assign({}, options), { fixLineFeeds: false }));
                conn.on('error', function (err) { return logCat.emit('error', err); });
                return logCat;
            });
        })
            .nodeify(cb);
    };
    AdbClient.prototype.syncService = function (serial) {
        return this.connection().then(function (conn) {
            return new sync_2.default(conn).execute(serial);
        });
    };
    AdbClient.prototype.clear = function (serial, pkg, cb) {
        return this.connection()
            .then(function (conn) {
            return new clear_1.default(conn).execute(serial, pkg);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.installRemote = function (serial, apk, options, args) {
        var _this = this;
        return this.connection().then(function (conn) {
            return new install_1.default(conn)
                .execute(serial, apk, options, args)
                .then(function () {
                return _this.shellInternal(serial, ['rm', '-f', apk]).then(function (stream) {
                    return new parser_1.default(stream).readAll().return();
                });
            });
        });
    };
    AdbClient.prototype.install = function (serial, apk, options, args, cb) {
        var _this = this;
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        if (typeof args === 'function') {
            cb = args;
            args = undefined;
        }
        var temp = sync_1.default.temp(typeof apk === 'string' ? apk : '_stream.apk');
        return this.push(serial, apk, temp).then(function (transfer) {
            var errorListener;
            var endListener;
            return new bluebird_1.default(function (resolve, reject) {
                transfer.on('error', (errorListener = function (err) {
                    reject(err);
                }));
                transfer.on('end', (endListener = function () {
                    _this.installRemote(serial, temp, options, args)
                        .then(resolve)
                        .catch(reject);
                }));
            })
                .finally(function () {
                transfer.removeListener('error', errorListener);
                return transfer.removeListener('end', endListener);
            })
                .nodeify(cb);
        });
    };
    AdbClient.prototype.uninstall = function (serial, pkg, options, cb) {
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        return this.connection()
            .then(function (conn) {
            return new uninstall_1.default(conn).execute(serial, pkg, options);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.isInstalled = function (serial, pkg, cb) {
        return this.connection()
            .then(function (conn) {
            return new isinstalled_1.default(conn).execute(serial, pkg);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.startActivity = function (serial, pkg, activity, options, cb) {
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        return this.connection()
            .then(function (conn) {
            return new startactivity_1.default(conn).execute(serial, pkg, activity, options);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.startService = function (serial, pkg, service, options, cb) {
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        return this.connection()
            .then(function (conn) {
            return new startservice_1.default(conn).execute(serial, pkg, service, options);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.stat = function (serial, path, cb) {
        process.emitWarning('Use fileStats() function instead', 'Warning');
        return this.syncService(serial)
            .then(function (sync) {
            return sync.stat(path).finally(function () {
                return sync.end();
            });
        })
            .nodeify(cb);
    };
    AdbClient.prototype.readDir = function (serial, path, cb) {
        return this.syncService(serial)
            .then(function (sync) {
            return sync.readDir(path).finally(function () {
                return sync.end();
            });
        })
            .nodeify(cb);
    };
    AdbClient.prototype.pull = function (serial, path, cb) {
        return this.syncService(serial)
            .then(function (sync) {
            return sync.pull(path).on('end', function () {
                sync.end();
            });
        })
            .nodeify(cb);
    };
    AdbClient.prototype.push = function (serial, srcPath, destPath, mode, cb) {
        if (typeof mode === 'function') {
            cb = mode;
            mode = undefined;
        }
        return this.syncService(serial)
            .then(function (sync) {
            return sync.push(srcPath, destPath, mode).on('end', function () {
                sync.end();
            });
        })
            .nodeify(cb);
    };
    AdbClient.prototype.tcpip = function (serial, port, cb) {
        var _this = this;
        if (typeof port === 'function') {
            cb = port;
            port = 5555;
        }
        return this.connection()
            .then(function (conn) {
            return new tcpip_1.default(conn).execute(serial, port, _this.options.host);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.usb = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new usb_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.waitBootComplete = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new wainbootcomplete_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.waitForDevice = function (tranport, state, cb) {
        return this.connection()
            .then(function (conn) {
            return new waitfordevice_1.default(conn).execute(tranport, state);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.map = function (mapper) {
        var _this = this;
        return this.listDevices().then(function (devices) {
            return bluebird_1.default.map(devices, function (device) {
                return mapper(new device_1.default(_this, device));
            });
        });
    };
    AdbClient.prototype.pushInternal = function (serial, data, dest) {
        return this.push(serial, data, "" + dest).then(function (transfer) {
            return new bluebird_1.default(function (resolve, reject) {
                transfer.on('end', function () {
                    return resolve();
                });
                transfer.on('error', reject);
            });
        });
    };
    AdbClient.prototype.pushDataToFile = function (serial, data, destPath, cb) {
        return this.pushInternal(serial, string_to_stream_1.default(data), destPath).nodeify(cb);
    };
    AdbClient.prototype.pushFile = function (serial, srcPath, destPath, cb) {
        return this.pushInternal(serial, srcPath, destPath).nodeify(cb);
    };
    AdbClient.prototype.pullDataFromFile = function (serial, srcPath, cb) {
        return this.pull(serial, "" + srcPath)
            .then(function (transfer) {
            return new bluebird_1.default(function (resolve, reject) {
                var data = '';
                transfer.on('data', function (chunk) {
                    data += chunk.toString();
                });
                transfer.on('end', function () {
                    resolve(data);
                });
                transfer.on('error', reject);
            });
        })
            .nodeify(cb);
    };
    AdbClient.prototype.pullFile = function (serial, srcPath, destPath, cb) {
        return this.pull(serial, "" + srcPath)
            .then(function (transfer) {
            return new bluebird_1.default(function (resolve, reject) {
                var hadError = false;
                transfer.once('readable', function () {
                    if (!hadError) {
                        transfer.pipe(fs_1.default.createWriteStream(destPath));
                    }
                });
                transfer.once('end', resolve);
                transfer.once('error', function (err) {
                    hadError = true;
                    reject(err);
                });
            });
        })
            .nodeify(cb);
    };
    AdbClient.prototype.setProp = function (serial, prop, value, cb) {
        return this.connection()
            .then(function (conn) {
            return new setproperty_1.default(conn).execute(serial, prop, value);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.getProp = function (serial, prop, cb) {
        return this.connection()
            .then(function (conn) {
            return new getproperty_1.default(conn).execute(serial, prop);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.putSetting = function (serial, mode, name, value, cb) {
        return this.connection()
            .then(function (conn) {
            return new putsetting_1.default(conn).execute(serial, mode, name, value);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.listSettings = function (serial, mode, cb) {
        return this.connection()
            .then(function (conn) {
            return new listsettings_1.default(conn).execute(serial, mode);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.getSetting = function (serial, mode, name, cb) {
        return this.connection()
            .then(function (conn) {
            return new getsetting_1.default(conn).execute(serial, mode, name);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.shell = function (serial, command, cb) {
        return this.connection()
            .then(function (conn) {
            return new shell_1.default(conn).execute(serial, command);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.custom = function (CustomCommand, cb) {
        return this.connection()
            .then(function (conn) {
            return new CustomCommand(conn).execute();
        })
            .nodeify(cb);
    };
    AdbClient.prototype.customTransport = function (CustomCommand, serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new CustomCommand(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.openMonkey = function (serial, cb) {
        var _this = this;
        var tryConnect = function (times) {
            return _this.openTcp(serial, 1080)
                .then(function (stream) {
                return new client_1.default().connect(stream);
            })
                .catch(function (err) {
                if ((times -= 1)) {
                    return bluebird_1.default.delay(100).then(function () {
                        return tryConnect(times);
                    });
                }
                else {
                    throw err;
                }
            });
        };
        return tryConnect(1)
            .catch(function (err) {
            return _this.transport(serial)
                .then(function (transport) {
                return new monkey_1.default(transport).execute(serial, 1080);
            })
                .then(function (out) {
                return tryConnect(20).then(function (monkey) {
                    return monkey.once('end', function () {
                        return out.end();
                    });
                });
            });
        })
            .nodeify(cb);
    };
    AdbClient.prototype.killApp = function (serial, pkg, cb) {
        this.shell(serial, "am force-stop " + pkg).return().nodeify(cb);
    };
    AdbClient.prototype.execInternal = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new bluebird_1.default(function (resolve, reject) {
            child_process_1.exec(_this.options.bin + " " + args.join(' '), function (err, stdout, stderr) {
                if (err)
                    return reject(err);
                else if (stderr)
                    return reject(new Error(stderr.trim()));
                else if (/Error/.test(stdout))
                    return reject(new Error(stdout.trim()));
                else
                    return resolve(stdout);
            });
        });
    };
    AdbClient.prototype.exec = function (cmd, cb) {
        return this.execInternal(cmd).nodeify(cb);
    };
    AdbClient.prototype.execDevice = function (serial, cmd, cb) {
        return this.execInternal.apply(this, ['-s', serial, cmd]).nodeify(cb);
    };
    AdbClient.prototype.execDeviceShell = function (serial, cmd, cb) {
        return this.execInternal.apply(this, ['-s', serial, 'shell', cmd]).nodeify(cb);
    };
    AdbClient.prototype.batteryStatus = function (serial, cb) {
        return this.connection()
            .then(function (conn) {
            return new baterrystatus_1.default(conn).execute(serial);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.rm = function (serial, path, options, cb) {
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        return this.connection()
            .then(function (conn) {
            return new rm_1.default(conn).execute(serial, path, options);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.mkdir = function (serial, path, options, cb) {
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        return this.connection()
            .then(function (conn) {
            return new mkdir_1.default(conn).execute(serial, path, options);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.touch = function (serial, path, options, cb) {
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        return this.connection()
            .then(function (conn) {
            return new touch_1.default(conn).execute(serial, path, options);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.mv = function (serial, srcPath, destPath, options, cb) {
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        return this.connection()
            .then(function (conn) {
            return new mv_1.default(conn).execute(serial, [srcPath, destPath], options);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.cp = function (serial, srcPath, destPath, options, cb) {
        if (typeof options === 'function' || !options) {
            cb = options;
            options = undefined;
        }
        return this.connection()
            .then(function (conn) {
            return new cp_1.default(conn).execute(serial, [srcPath, destPath], options);
        })
            .nodeify(cb);
    };
    AdbClient.prototype.fileStat = function (serial, path, cb) {
        return this.connection().then(function (conn) {
            return new filestat_1.default(conn).execute(serial, path).nodeify(cb);
        });
    };
    return AdbClient;
}(events_1.EventEmitter));
exports.default = AdbClient;
