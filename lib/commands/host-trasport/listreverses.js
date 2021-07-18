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
var transport_parse_value_command_1 = __importDefault(require("../transport-parse-value-command"));
var ListReversesCommand = (function (_super) {
    __extends(ListReversesCommand, _super);
    function ListReversesCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListReversesCommand.prototype.parse = function (value) {
        var reverses = [];
        var line = value.toString().split('\n');
        for (var _i = 0, line_1 = line; _i < line_1.length; _i++) {
            var item = line_1[_i];
            if (item) {
                var tmp = item.split(/\s+/);
                reverses.push({
                    remote: tmp[1],
                    local: tmp[2]
                });
            }
        }
        return reverses;
    };
    ListReversesCommand.prototype.execute = function (serial) {
        return _super.prototype.execute.call(this, serial, 'reverse:list-forward');
    };
    return ListReversesCommand;
}(transport_parse_value_command_1.default));
exports.default = ListReversesCommand;
