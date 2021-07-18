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
var __1 = require("../..");
var tranport_1 = __importDefault(require("../tranport"));
var InstallCommand = (function (_super) {
    __extends(InstallCommand, _super);
    function InstallCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstallCommand.prototype.intentArgs = function (options) {
        var args = [];
        if (!options)
            return args;
        if (options.reinstall) {
            args.push('-r');
            delete options.reinstall;
        }
        if (options.test) {
            args.push('-t');
            delete options.test;
        }
        if (options.internal) {
            args.push('-f');
            delete options.internal;
        }
        if (options.allowDowngrade) {
            args.push('-d');
            delete options.allowDowngrade;
        }
        if (options.grandPermissions) {
            args.push('-g');
            delete options.grandPermissions;
        }
        for (var _i = 0, _a = Object.entries(options); _i < _a.length; _i++) {
            var item = _a[_i];
            args.push(item[0], this.escape(item[1]));
        }
        return args;
    };
    InstallCommand.prototype.execute = function (serial, apk, options, args) {
        var _this = this;
        return _super.prototype.execute.apply(this, __spreadArrays([serial, "shell:pm install"], this.intentArgs(options), [this.escapeCompat(apk),
            args || ''])).then(function (reply) {
            switch (reply) {
                case __1.Reply.OKAY:
                    return _this.parser
                        .searchLine(/^(Success|Failure \[(.*?)\])$/)
                        .then(function (match) {
                        if (match[1] === 'Success') {
                            return;
                        }
                        else {
                            var code = match[2];
                            var err = new Error(apk + ' could not be installed [' + code + ']');
                            throw err;
                        }
                    })
                        .finally(function () {
                        return _this.parser.readAll();
                    });
                case __1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return InstallCommand;
}(tranport_1.default));
exports.default = InstallCommand;
