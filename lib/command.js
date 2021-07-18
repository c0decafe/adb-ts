"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var parser_1 = __importDefault(require("./parser"));
var Command = (function () {
    function Command(connection) {
        this.connection = connection;
        this.parser = new parser_1.default(this.connection);
    }
    Command.prototype.getConnection = function () {
        return this.connection;
    };
    Command.prototype.getParser = function () {
        return this.parser;
    };
    Command.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.connection.write(_1.encodeData(args.join(' ')));
        return this.parser.readAscii(4).then(function (reply) {
            return reply;
        });
    };
    Command.prototype.escape = function (arg) {
        switch (typeof arg) {
            case 'undefined':
                return '';
            case 'string':
                return "'" + arg.replace(/'/g, "'\"'\"'") + "'";
            default:
                return "" + arg;
        }
    };
    Command.prototype.escapeCompat = function (arg) {
        switch (typeof arg) {
            case 'undefined':
                return '';
            case 'string':
                return '"' + arg.replace(/([$`\\!"])/g, '\\$1') + '"';
            default:
                return "" + arg;
        }
    };
    return Command;
}());
exports.default = Command;
