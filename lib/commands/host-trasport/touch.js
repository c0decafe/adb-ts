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
var moment_1 = __importDefault(require("moment"));
var filesystem_1 = __importDefault(require("../filesystem"));
var TouchCommand = (function (_super) {
    __extends(TouchCommand, _super);
    function TouchCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchCommand.prototype.intentArgs = function (options) {
        var args = [];
        if (!options) {
            return args;
        }
        else {
            if (options.aTime) {
                args.push('-a');
            }
            if (options.mTime) {
                args.push('-m');
            }
            if (options.noCreate) {
                args.push('-c');
            }
            if (options.symlink) {
                args.push('-h');
            }
            if (options.date) {
                args.push('-d', moment_1.default(options.date).toISOString());
            }
            if (options.time) {
                args.push('-t', moment_1.default(options.time).format('YYMMDDhhmm[.]ss'));
            }
            if (options.reference) {
                args.push('-r', options.reference);
            }
            return args;
        }
    };
    TouchCommand.prototype.getCmd = function () {
        return 'touch';
    };
    TouchCommand.prototype.execute = function (serial, path, options) {
        return _super.prototype.execute.call(this, serial, path, options);
    };
    return TouchCommand;
}(filesystem_1.default));
exports.default = TouchCommand;
