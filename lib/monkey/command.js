"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = (function () {
    function Command(command, callback) {
        this.callback = callback;
        this.command = command;
    }
    return Command;
}());
exports.default = Command;
