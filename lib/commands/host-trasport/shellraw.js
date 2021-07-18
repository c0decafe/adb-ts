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
var raw_command_1 = __importDefault(require("../raw-command"));
var ShellRawCommand = (function (_super) {
    __extends(ShellRawCommand, _super);
    function ShellRawCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShellRawCommand.prototype.execute = function (serial, command) {
        if (Array.isArray(command)) {
            command = command.map(this.escape).join(' ');
        }
        return _super.prototype.execute.call(this, serial, 'shell:', command);
    };
    return ShellRawCommand;
}(raw_command_1.default));
exports.default = ShellRawCommand;
