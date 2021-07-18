"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var reader_1 = __importDefault(require("./reader"));
var Logcat = (function () {
    function Logcat() {
    }
    Logcat.readStrem = function (stream, options) {
        return new reader_1.default(options).connect(stream);
    };
    Logcat.Reader = reader_1.default;
    return Logcat;
}());
exports.default = Logcat;
