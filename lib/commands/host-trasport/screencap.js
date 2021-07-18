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
var linetransform_1 = __importDefault(require("../../linetransform"));
var raw_command_1 = __importDefault(require("../raw-command"));
var ScreencapCommand = (function (_super) {
    __extends(ScreencapCommand, _super);
    function ScreencapCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreencapCommand.prototype.execute = function (serial) {
        var _this = this;
        return _super.prototype.execute.call(this, serial, 'shell:echo && screencap -p 2>/dev/null')
            .then(function () {
            return _this.parser.readBytes(1)
                .then(function (chunk) {
                var transform = new linetransform_1.default({ autoDetect: true });
                transform.write(chunk);
                _this.connection.pipe(transform);
                return transform;
            })
                .catch(__1.PrematureEOFError, function () {
                throw new Error('No support for the screencap command');
            });
        });
    };
    return ScreencapCommand;
}(raw_command_1.default));
exports.default = ScreencapCommand;
