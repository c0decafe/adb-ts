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
var UninstallCommand = (function (_super) {
    __extends(UninstallCommand, _super);
    function UninstallCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UninstallCommand.prototype.execute = function (serial, pkg, options) {
        var _this = this;
        return _super.prototype.execute.call(this, serial, 'shell:pm uninstall', (options === null || options === void 0 ? void 0 : options.keepCache) ? '-k' : '', pkg)
            .then(function (reply) {
            switch (reply) {
                case __1.Reply.OKAY:
                    return _this.parser.searchLine(/^(Success|Failure.*|.*Unknown package:.*)$/)
                        .then(function () {
                        return;
                    })
                        .finally(function () {
                        return _this.parser.readAll();
                    });
                case __1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return UninstallCommand;
}(tranport_1.default));
exports.default = UninstallCommand;
