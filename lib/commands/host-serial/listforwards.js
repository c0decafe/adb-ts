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
var parse_command_1 = __importDefault(require("../parse-command"));
var ListForwardsCommand = (function (_super) {
    __extends(ListForwardsCommand, _super);
    function ListForwardsCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListForwardsCommand.prototype.parse = function (value) {
        var forwards = [];
        if (!value)
            return forwards;
        var line = value.split('\n');
        for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
            var item = line_1[_i];
            var tmp = item.split(/\s+/);
            forwards.push({
                serial: tmp[0],
                local: tmp[1],
                remote: tmp[2]
            });
        }
        return forwards;
    };
    ListForwardsCommand.prototype.execute = function (serial) {
        return _super.prototype.execute.call(this, "host-serial:" + serial + ":list-forward");
    };
    return ListForwardsCommand;
}(parse_command_1.default));
exports.default = ListForwardsCommand;
