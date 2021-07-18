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
var fs_1 = __importDefault(require("fs"));
var Stats = (function (_super) {
    __extends(Stats, _super);
    function Stats(mode, size, mtime) {
        var _this = _super.call(this) || this;
        _this.mode = mode;
        _this.size = size;
        _this.mtime = new Date(mtime * 1000);
        return _this;
    }
    Stats.S_IFMT = 0xf000;
    Stats.S_IFSOCK = 0xc000;
    Stats.S_IFLNK = 0xa000;
    Stats.S_IFREG = 0x8000;
    Stats.S_IFBLK = 0x6000;
    Stats.S_IFDIR = 0x4000;
    Stats.S_IFCHR = 0x2000;
    Stats.S_IFIFO = 0x1000;
    Stats.S_ISUID = 0x800;
    Stats.S_ISGID = 0x400;
    Stats.S_ISVTX = 0x200;
    Stats.S_IRWXU = 0x1c0;
    Stats.S_IRUSR = 0x100;
    Stats.S_IWUSR = 0x80;
    Stats.S_IXUSR = 0x40;
    Stats.S_IRWXG = 0x38;
    Stats.S_IRGRP = 0x20;
    return Stats;
}(fs_1.default.Stats));
exports.default = Stats;
