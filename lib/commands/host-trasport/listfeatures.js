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
var transport_parse_all_command_1 = __importDefault(require("../transport-parse-all-command"));
var __1 = require("../..");
var ListFeaturesCommand = (function (_super) {
    __extends(ListFeaturesCommand, _super);
    function ListFeaturesCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListFeaturesCommand.prototype.parse = function (value) {
        var features = {};
        var match;
        var regExp = /^feature:(.*?)(?:=(.*?))?\r?$/gm;
        while (match = regExp.exec(value)) {
            features[match[1]] = __1.stringToType(match[2]) || true;
        }
        return features;
    };
    ListFeaturesCommand.prototype.execute = function (serial) {
        return _super.prototype.execute.call(this, serial, 'shell:pm list features 2>/dev/null');
    };
    return ListFeaturesCommand;
}(transport_parse_all_command_1.default));
exports.default = ListFeaturesCommand;
