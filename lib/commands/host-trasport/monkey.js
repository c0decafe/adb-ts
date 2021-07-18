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
var bluebird_1 = __importDefault(require("bluebird"));
var tranport_1 = __importDefault(require("../tranport"));
var MonkeyCommand = (function (_super) {
    __extends(MonkeyCommand, _super);
    function MonkeyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonkeyCommand.prototype.execute = function (serial, port) {
        var _this = this;
        return _super.prototype.execute.call(this, serial, "shell:EXTERNAL_STORAGE=/data/local/tmp monkey --port " + port + " -v")
            .then(function (reply) {
            switch (reply) {
                case __1.Reply.OKAY:
                    return _this.parser.searchLine(/^:Monkey:/).timeout(1000).then(function () { return _this.connection; })
                        .catch(bluebird_1.default.TimeoutError, function () { return _this.connection; });
                case __1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return MonkeyCommand;
}(tranport_1.default));
exports.default = MonkeyCommand;
