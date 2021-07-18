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
var GetPropertyCommand = (function (_super) {
    __extends(GetPropertyCommand, _super);
    function GetPropertyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetPropertyCommand.prototype.parse = function (value) {
        return __1.stringToType(value);
    };
    GetPropertyCommand.prototype.execute = function (serial, prop) {
        return _super.prototype.execute.call(this, serial, "shell:getprop " + prop);
    };
    return GetPropertyCommand;
}(transport_parse_all_command_1.default));
exports.default = GetPropertyCommand;
