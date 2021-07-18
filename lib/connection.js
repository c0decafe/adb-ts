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
var net_1 = require("net");
var parser_1 = __importDefault(require("./parser"));
var Connection = (function (_super) {
    __extends(Connection, _super);
    function Connection(options) {
        var _this = _super.call(this, options) || this;
        _this.setKeepAlive(true);
        _this.setNoDelay(true);
        _this.parser = new parser_1.default(_this);
        return _this;
    }
    Connection.prototype.connect = function (param1, param2, param3) {
        _super.prototype.connect.call(this, param1, param2, param3);
        return this;
    };
    Connection.prototype.getParser = function () {
        return this.parser;
    };
    return Connection;
}(net_1.Socket));
exports.default = Connection;
