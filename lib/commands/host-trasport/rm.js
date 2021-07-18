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
var RmCommand = (function (_super) {
    __extends(RmCommand, _super);
    function RmCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RmCommand.prototype.intentArgs = function (options) {
        var args = [];
        if (!options) {
            return args;
        }
        if (options.force) {
            args.push('-f');
            delete options.force;
        }
        if (options.recursive) {
            args.push('-rR');
            delete options.recursive;
        }
        for (var _i = 0, _a = Object.entries(options); _i < _a.length; _i++) {
            var item = _a[_i];
            args.push(item[0], this.escape(item[1]));
        }
        return args;
    };
    RmCommand.prototype.getCmd = function () {
        return 'rm';
    };
    RmCommand.prototype.execute = function (serial, path, options) {
        return _super.prototype.execute.call(this, serial, path, options);
    };
    return RmCommand;
}(filesystem_1.default));
exports.default = RmCommand;
