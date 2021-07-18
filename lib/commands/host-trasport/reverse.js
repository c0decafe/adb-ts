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
var empty_command_1 = __importDefault(require("../empty-command"));
var ReverseCommand = (function (_super) {
    __extends(ReverseCommand, _super);
    function ReverseCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReverseCommand.prototype.execute = function (serial, remote, local) {
        return _super.prototype.execute.call(this, serial, "reverse:forward:" + remote + ";" + local);
    };
    return ReverseCommand;
}(empty_command_1.default));
exports.default = ReverseCommand;
