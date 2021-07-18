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
var bluebird_1 = __importDefault(require("bluebird"));
var events_1 = require("events");
var _1 = require(".");
var device_1 = __importDefault(require("./device"));
bluebird_1.default.config({ cancellation: true });
var Tracker = (function (_super) {
    __extends(Tracker, _super);
    function Tracker(command, client) {
        var _this = _super.call(this) || this;
        _this.command = command;
        _this.deviceMap = {};
        _this.client = client;
        _this.reader = _this.read()
            .catch(_1.PrematureEOFError, function () {
            throw new Error('Connection closed');
        })
            .catch(function (err) {
            _this.emit('error', err);
        })
            .finally(function () {
            return _this.command.getParser().end()
                .then(function () {
                _this.emit('end');
            });
        });
        return _this;
    }
    Tracker.prototype.read = function () {
        var _this = this;
        return this.command.readDevices()
            .then(function (list) {
            _this.update(list);
            return _this.read();
        }).catch(function (err) {
            _this.emit('error', err);
        });
    };
    Tracker.prototype.update = function (list) {
        var newMap = {};
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var d = list_1[_i];
            var oldDevice = this.deviceMap[d.id];
            if (oldDevice) {
                if (d.state !== (oldDevice === null || oldDevice === void 0 ? void 0 : oldDevice.state)) {
                    this.emit('change', new device_1.default(this.client, d));
                }
            }
            else {
                this.emit('add', new device_1.default(this.client, d));
            }
            newMap[d.id] = d;
        }
        for (var _a = 0, _b = Object.values(this.deviceMap); _a < _b.length; _a++) {
            var d = _b[_a];
            if (!newMap[d.id]) {
                this.emit('remove', d);
            }
        }
        this.deviceMap = newMap;
    };
    Tracker.prototype.end = function () {
        this.reader.cancel();
    };
    Tracker.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    return Tracker;
}(events_1.EventEmitter));
exports.default = Tracker;
