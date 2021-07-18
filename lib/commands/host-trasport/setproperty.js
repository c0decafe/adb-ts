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
var tranport_1 = __importDefault(require("../tranport"));
var SetProp = (function (_super) {
    __extends(SetProp, _super);
    function SetProp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetProp.prototype.execute = function (serial, prop, value) {
        var _this = this;
        return _super.prototype.execute.call(this, serial, "shell:setprop " + prop + " " + this.escape(value))
            .then(function () {
            return _this.parser.readAll().then(function (value) {
                var valueStr = value.toString();
                if (/failed/.test(valueStr)) {
                    throw new Error(valueStr);
                }
            });
        });
    };
    return SetProp;
}(tranport_1.default));
exports.default = SetProp;
