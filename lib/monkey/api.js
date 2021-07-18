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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Api = (function (_super) {
    __extends(Api, _super);
    function Api() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Api.prototype.keyDown = function (keyCode, cb) {
        return this.send("key down " + keyCode, cb);
    };
    Api.prototype.keyUp = function (keyCode, cb) {
        return this.send("key up " + keyCode, cb);
    };
    Api.prototype.touchDown = function (x, y, cb) {
        return this.send("touch down " + x + " " + y, cb);
    };
    Api.prototype.touchUp = function (x, y, cb) {
        return this.send("touch up " + x + " " + y, cb);
    };
    Api.prototype.touchMove = function (x, y, cb) {
        return this.send("touch move " + x + " " + y, cb);
    };
    Api.prototype.trackball = function (dx, dy, cb) {
        return this.send("trackball " + dx + " " + dy, cb);
    };
    Api.prototype.flipOpen = function (cb) {
        return this.send("flip open", cb);
    };
    Api.prototype.flipClose = function (cb) {
        return this.send("flip close", cb);
    };
    Api.prototype.wake = function (cb) {
        return this.send("wake", cb);
    };
    Api.prototype.tap = function (x, y, cb) {
        return this.send("tap " + x + " " + y, cb);
    };
    Api.prototype.press = function (keyCode, cb) {
        return this.send("press " + keyCode, cb);
    };
    Api.prototype.type = function (str, cb) {
        str = str.replace(/"/g, '\\"');
        if (str.indexOf(' ') === -1) {
            this.send("type " + str, cb);
        }
        else {
            this.send("type \"" + str + "\"", cb);
        }
        return this;
    };
    Api.prototype.list = function (cb) {
        return this.send('listvar', function (err, vars) {
            if (err) {
                return cb(err, null);
            }
            if (err) {
                return cb(err, null);
            }
            else {
                return cb(null, vars.trim().split(/\s+/g));
            }
        });
    };
    Api.prototype.get = function (name, cb) {
        this.send("getvar " + name, cb);
        return this;
    };
    Api.prototype.sleep = function (ms, cb) {
        this.send("sleep " + ms, cb);
        return this;
    };
    Api.prototype.quit = function (cb) {
        this.send("quit", cb);
        return this;
    };
    ;
    Api.prototype.done = function (cb) {
        this.send("done", cb);
        return this;
    };
    ;
    Api.prototype.getAmCurrentAction = function (cb) {
        this.get('am.current.action', cb);
        return this;
    };
    ;
    Api.prototype.getAmCurrentCategories = function (cb) {
        this.get('am.current.categories', cb);
        return this;
    };
    ;
    Api.prototype.getAmCurrentCompClass = function (cb) {
        this.get('am.current.comp.class', cb);
        return this;
    };
    ;
    Api.prototype.getAmCurrentCompPackage = function (cb) {
        this.get('am.current.comp.package', cb);
        return this;
    };
    ;
    Api.prototype.getAmCurrentData = function (cb) {
        this.get('am.current.data', cb);
        return this;
    };
    ;
    Api.prototype.getAmCurrentPackage = function (cb) {
        this.get('am.current.package', cb);
        return this;
    };
    ;
    Api.prototype.getBuildBoard = function (cb) {
        this.get('build.board', cb);
        return this;
    };
    ;
    Api.prototype.getBuildBrand = function (cb) {
        this.get('build.brand', cb);
        return this;
    };
    ;
    Api.prototype.getBuildCpuAbi = function (cb) {
        this.get('build.cpu_abi', cb);
        return this;
    };
    ;
    Api.prototype.getBuildDevice = function (cb) {
        this.get('build.device', cb);
        return this;
    };
    ;
    Api.prototype.getBuildDisplay = function (cb) {
        this.get('build.display', cb);
        return this;
    };
    ;
    Api.prototype.getBuildFingerprint = function (cb) {
        this.get('build.fingerprint', cb);
        return this;
    };
    ;
    Api.prototype.getBuildHost = function (cb) {
        this.get('build.host', cb);
        return this;
    };
    ;
    Api.prototype.getBuildId = function (cb) {
        this.get('build.id', cb);
        return this;
    };
    ;
    Api.prototype.getBuildManufacturer = function (cb) {
        this.get('build.manufacturer', cb);
        return this;
    };
    ;
    Api.prototype.getBuildModel = function (cb) {
        this.get('build.model', cb);
        return this;
    };
    ;
    Api.prototype.getBuildProduct = function (cb) {
        this.get('build.product', cb);
        return this;
    };
    ;
    Api.prototype.getBuildTags = function (cb) {
        this.get('build.tags', cb);
        return this;
    };
    ;
    Api.prototype.getBuildType = function (cb) {
        this.get('build.type', cb);
        return this;
    };
    ;
    Api.prototype.getBuildUser = function (cb) {
        this.get('build.user', cb);
        return this;
    };
    ;
    Api.prototype.getBuildVersionCodename = function (cb) {
        this.get('build.version.codename', cb);
        return this;
    };
    ;
    Api.prototype.getBuildVersionIncremental = function (cb) {
        this.get('build.version.incremental', cb);
        return this;
    };
    ;
    Api.prototype.getBuildVersionRelease = function (cb) {
        this.get('build.version.release', cb);
        return this;
    };
    ;
    Api.prototype.getBuildVersionSdk = function (cb) {
        this.get('build.version.sdk', cb);
        return this;
    };
    ;
    Api.prototype.getClockMillis = function (cb) {
        this.get('clock.millis', cb);
        return this;
    };
    ;
    Api.prototype.getClockRealtime = function (cb) {
        this.get('clock.realtime', cb);
        return this;
    };
    ;
    Api.prototype.getClockUptime = function (cb) {
        this.get('clock.uptime', cb);
        return this;
    };
    ;
    Api.prototype.getDisplayDensity = function (cb) {
        this.get('display.density', cb);
        return this;
    };
    ;
    Api.prototype.getDisplayHeight = function (cb) {
        this.get('display.height', cb);
        return this;
    };
    ;
    Api.prototype.getDisplayWidth = function (cb) {
        this.get('display.width', cb);
        return this;
    };
    ;
    return Api;
}(events_1.EventEmitter));
exports.default = Api;
