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
var ClearCommand = (function (_super) {
    __extends(ClearCommand, _super);
    function ClearCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClearCommand.prototype.execute = function (serial, pkg) {
        var _this = this;
        return _super.prototype.execute.call(this, serial, "shell:pm clear " + pkg)
            .then(function (reply) {
            switch (reply) {
                case __1.Reply.OKAY:
                    return _this.parser.searchLine(/^(Success|Failed)$/)
                        .finally(function () {
                        return _this.parser.end();
                    })
                        .then(function (result) {
                        switch (result[0]) {
                            case 'Success':
                                return;
                            case 'Failed':
                                throw new Error("Package '" + pkg + "' could not be cleared");
                        }
                    });
                case __1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return ClearCommand;
}(tranport_1.default));
exports.default = ClearCommand;
