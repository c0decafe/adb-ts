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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var FileStats = (function (_super) {
    __extends(FileStats, _super);
    function FileStats(props) {
        var _this = _super.call(this) || this;
        Object.assign(_this, props);
        return _this;
    }
    FileStats.prototype.isSocket = function () {
        return /socket/.test(this.type);
    };
    FileStats.prototype.isFIFO = function () {
        return /fifo/.test(this.type);
    };
    FileStats.prototype.isSymbolicLink = function () {
        return /link/.test(this.type);
    };
    FileStats.prototype.isCharacterDevice = function () {
        return /character/.test(this.type);
    };
    FileStats.prototype.isBlockDevice = function () {
        return /block/.test(this.type);
    };
    FileStats.prototype.isDirectory = function () {
        return /directory/.test(this.type);
    };
    FileStats.prototype.isFile = function () {
        return /file/.test(this.type);
    };
    return FileStats;
}(fs_1.Stats));
exports.default = FileStats;
