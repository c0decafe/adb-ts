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
exports.constructDevice = void 0;
var _1 = require(".");
var command_1 = __importDefault(require("./command"));
var ip_regex_1 = __importDefault(require("ip-regex"));
function constructDevice(device) {
    device.transport = ip_regex_1.default().test(device.id) ? 'local' : 'usb';
    device.state = /emulator/.test(device.id) && device.state === 'device' ? 'emulator' : device.state;
    return device;
}
exports.constructDevice = constructDevice;
var DevicesCommand = (function (_super) {
    __extends(DevicesCommand, _super);
    function DevicesCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DevicesCommand.prototype.parse = function (value) {
        var devices = [];
        var valueStr = value;
        if (!value.length) {
            return devices;
        }
        var lines = valueStr.split('\n');
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (line) {
                var tmp = line.split(/\s+/);
                devices.push(constructDevice({
                    id: tmp[0],
                    state: tmp[1],
                    path: tmp[2],
                    product: tmp[3],
                    model: tmp[4],
                    device: tmp[5],
                    transportId: tmp[6],
                    transport: 'any'
                }));
            }
        }
        return devices;
    };
    DevicesCommand.prototype.readDevices = function () {
        var _this = this;
        return this.parser.readValue()
            .then(function (value) {
            return _this.parse(value.toString().trim());
        });
    };
    DevicesCommand.prototype.execute = function (command) {
        var _this = this;
        return _super.prototype.execute.call(this, command)
            .then(function (reply) {
            switch (reply) {
                case _1.Reply.OKAY:
                    return;
                case _1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return DevicesCommand;
}(command_1.default));
exports.default = DevicesCommand;
