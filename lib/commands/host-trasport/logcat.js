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
var linetransform_1 = __importDefault(require("../../linetransform"));
var raw_command_1 = __importDefault(require("../raw-command"));
var LogcatCommand = (function (_super) {
    __extends(LogcatCommand, _super);
    function LogcatCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogcatCommand.prototype.execute = function (serial, options) {
        var cmd = 'logcat -B *:I 2>/dev/null';
        if (options === null || options === void 0 ? void 0 : options.clear) {
            cmd = 'logcat -c 2>/dev/null && ' + cmd;
        }
        return _super.prototype.execute.call(this, serial, "shell:echo && " + cmd)
            .then(function (result) {
            var transform = new linetransform_1.default({ autoDetect: true });
            result.pipe(transform);
            return transform;
        });
    };
    return LogcatCommand;
}(raw_command_1.default));
exports.default = LogcatCommand;
