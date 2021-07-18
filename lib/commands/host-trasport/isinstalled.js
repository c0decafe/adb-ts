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
var tranport_1 = __importDefault(require("../tranport"));
var IsInstalledCommand = (function (_super) {
    __extends(IsInstalledCommand, _super);
    function IsInstalledCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsInstalledCommand.prototype.execute = function (serial, pkg) {
        var _this = this;
        return _super.prototype.execute.call(this, serial, "shell:pm path " + pkg + " 2>/dev/null")
            .then(function (reply) {
            switch (reply) {
                case __1.Reply.OKAY:
                    return _this.parser.readAscii(8).then(function (reply) {
                        switch (reply) {
                            case 'package:':
                                return true;
                            default:
                                return _this.parser.unexpected(reply, 'package:');
                        }
                    }).catch(function (err) {
                        return false;
                    });
                case __1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return IsInstalledCommand;
}(tranport_1.default));
exports.default = IsInstalledCommand;
