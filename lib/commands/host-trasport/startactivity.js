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
var startservice_1 = __importDefault(require("./startservice"));
var StartActivityCommand = (function (_super) {
    __extends(StartActivityCommand, _super);
    function StartActivityCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartActivityCommand.prototype.execute = function (serial, pkg, activity, options) {
        return _super.prototype.execute.call(this, serial, pkg, activity, options, 'shell:am start ');
    };
    return StartActivityCommand;
}(startservice_1.default));
exports.default = StartActivityCommand;
