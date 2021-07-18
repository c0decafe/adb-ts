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
var value_command_1 = __importDefault(require("./value-command"));
var ParseCommand = (function (_super) {
    __extends(ParseCommand, _super);
    function ParseCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParseCommand.prototype.execute = function () {
        var _this = this;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return _super.prototype.execute.apply(this, params).then(function (value) {
            return _this.parse(value);
        });
    };
    return ParseCommand;
}(value_command_1.default));
exports.default = ParseCommand;
