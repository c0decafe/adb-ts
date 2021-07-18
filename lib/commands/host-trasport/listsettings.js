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
var ListSettingsCommand = (function (_super) {
    __extends(ListSettingsCommand, _super);
    function ListSettingsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListSettingsCommand.prototype.parse = function (value) {
        var settings = {};
        var match;
        var regExp = /^([\s\S]*?)=([\s\S]*?)\n/gm;
        while ((match = regExp.exec(value))) {
            settings[match[1]] = __1.stringToType(match[2] === '' ? undefined : match[2]);
        }
        return settings;
    };
    ListSettingsCommand.prototype.execute = function (serial, mode) {
        return _super.prototype.execute.call(this, serial, "shell:settings list " + mode);
    };
    return ListSettingsCommand;
}(transport_parse_all_command_1.default));
exports.default = ListSettingsCommand;
