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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var tranport_1 = __importDefault(require("./tranport"));
var FileSystemCommand = (function (_super) {
    __extends(FileSystemCommand, _super);
    function FileSystemCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileSystemCommand.prototype.isError = function (value) {
        var split = value.split(':');
        var err = split[split.length - 1];
        return /No/.test(err) || /denied/.test(err);
    };
    FileSystemCommand.prototype.execute = function (serial, path, options) {
        var _this = this;
        var pathArr = Array.isArray(path) ? path : [path];
        return _super.prototype.execute.apply(this, __spreadArrays([serial,
            'shell:' + this.getCmd()], this.intentArgs(options), pathArr)).then(function (reply) {
            switch (reply) {
                case __1.Reply.OKAY:
                    return _this.parser.readAll().then(function (value) {
                        var valueStr = value.toString().trim();
                        if (_this.isError(valueStr)) {
                            throw new Error(valueStr);
                        }
                        else if (options && options.verbose) {
                            return valueStr;
                        }
                        else {
                            return '';
                        }
                    });
                case __1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return FileSystemCommand;
}(tranport_1.default));
exports.default = FileSystemCommand;