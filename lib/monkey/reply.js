"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyType = void 0;
var ReplyType;
(function (ReplyType) {
    ReplyType["ERROR"] = "ERROR";
    ReplyType["OK"] = "OK";
})(ReplyType = exports.ReplyType || (exports.ReplyType = {}));
var Reply = (function () {
    function Reply(type, value) {
        this.type = type;
        this.value = value;
    }
    Reply.prototype.isError = function () { return this.type === ReplyType.ERROR; };
    Reply.prototype.toError = function () {
        if (!this.isError()) {
            throw new Error('toError() cannot be called for non-errors');
        }
        return new Error(this.value);
    };
    return Reply;
}());
exports.default = Reply;
