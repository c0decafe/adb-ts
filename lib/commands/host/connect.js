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
var __1 = require("../..");
var command_1 = __importDefault(require("../../command"));
var ConnectCommand = (function (_super) {
    __extends(ConnectCommand, _super);
    function ConnectCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectCommand.prototype.execute = function (host, port) {
        var _this = this;
        return _super.prototype.execute.call(this, "host:connect:" + host + ":" + port)
            .then(function (reply) {
            switch (reply) {
                case __1.Reply.OKAY:
                    return _this.parser.readValue().then(function (value) {
                        var regExp = /connected to|already connected/;
                        if (regExp.test(value.toString())) {
                            return host + ":" + port;
                        }
                        else {
                            throw new Error(value.toString());
                        }
                    });
                case __1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return ConnectCommand;
}(command_1.default));
exports.default = ConnectCommand;
