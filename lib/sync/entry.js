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
var stats_1 = __importDefault(require("./stats"));
var SyncEntry = (function (_super) {
    __extends(SyncEntry, _super);
    function SyncEntry(name, mode, size, mtime) {
        var _this = _super.call(this, mode, size, mtime) || this;
        _this.name = name;
        return _this;
    }
    SyncEntry.prototype.toString = function () {
        return this.name;
    };
    return SyncEntry;
}(stats_1.default));
exports.default = SyncEntry;
