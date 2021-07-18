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
var ip_regex_1 = __importDefault(require("ip-regex"));
var __1 = require("../..");
var tranport_1 = __importDefault(require("../tranport"));
var GetIpAddressCommand = (function (_super) {
    __extends(GetIpAddressCommand, _super);
    function GetIpAddressCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetIpAddressCommand.prototype.execute = function (serial) {
        var _this = this;
        return _super.prototype.execute.call(this, serial, "shell:ip route | awk '{ print $9 }'")
            .then(function (reply) {
            switch (reply) {
                case __1.Reply.OKAY:
                    return _this.parser.readAll()
                        .then(function (value) {
                        var valueStr = value.toString().trim();
                        return ip_regex_1.default().test(valueStr) ? valueStr : undefined;
                    });
                case __1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return GetIpAddressCommand;
}(tranport_1.default));
exports.default = GetIpAddressCommand;
