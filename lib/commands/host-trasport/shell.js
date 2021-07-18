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
var __1 = require("../..");
var transport_parse_all_command_1 = __importDefault(require("../transport-parse-all-command"));
var ShellCommand = (function (_super) {
    __extends(ShellCommand, _super);
    function ShellCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShellCommand.prototype.parse = function (value) {
        return __1.stringToType(value);
    };
    ShellCommand.prototype.execute = function (serial, command) {
        return _super.prototype.execute.call(this, serial, 'shell:', command);
    };
    return ShellCommand;
}(transport_parse_all_command_1.default));
exports.default = ShellCommand;
