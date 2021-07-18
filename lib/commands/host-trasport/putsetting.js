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
var PutSetting = (function (_super) {
    __extends(PutSetting, _super);
    function PutSetting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PutSetting.prototype.execute = function (serial, mode, name, value) {
        var _this = this;
        return _super.prototype.execute.call(this, serial, 'shell:settings put', mode, name, this.escape(value))
            .then(function () {
            return _this.parser.readAll().then(function (value) {
                var valueStr = value.toString();
                if (/failed/.test(valueStr)) {
                    throw new Error(valueStr);
                }
            });
        });
    };
    return PutSetting;
}(tranport_1.default));
exports.default = PutSetting;
