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
var filesystem_1 = __importDefault(require("../filesystem"));
var MkDirCommand = (function (_super) {
    __extends(MkDirCommand, _super);
    function MkDirCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MkDirCommand.prototype.intentArgs = function (options) {
        var args = [];
        if (!options) {
            return args;
        }
        if (options.mode !== undefined) {
            args.push('-m', options.mode.toString());
        }
        if (options.parent) {
            args.push('-p');
        }
        return args;
    };
    MkDirCommand.prototype.getCmd = function () {
        return 'mkdir';
    };
    MkDirCommand.prototype.execute = function (serial, path, options) {
        return _super.prototype.execute.call(this, serial, path, options);
    };
    return MkDirCommand;
}(filesystem_1.default));
exports.default = MkDirCommand;
