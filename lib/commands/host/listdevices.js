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
var devices_1 = __importDefault(require("../../devices"));
var ListDevicesCommand = (function (_super) {
    __extends(ListDevicesCommand, _super);
    function ListDevicesCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListDevicesCommand.prototype.execute = function () {
        var _this = this;
        return _super.prototype.execute.call(this, 'host:devices-l')
            .then(function () {
            return _this.readDevices();
        });
    };
    return ListDevicesCommand;
}(devices_1.default));
exports.default = ListDevicesCommand;
