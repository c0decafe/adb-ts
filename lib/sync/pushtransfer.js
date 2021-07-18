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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var PushTransfer = (function (_super) {
    __extends(PushTransfer, _super);
    function PushTransfer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stack = [];
        _this.stats = {
            bytesTransferred: 0
        };
        return _this;
    }
    PushTransfer.prototype.cancel = function () {
        this.emit('cancel');
    };
    PushTransfer.prototype.push = function (byteCount) {
        this.stack.push(byteCount);
    };
    PushTransfer.prototype.pop = function () {
        var byteCount = this.stack.pop();
        this.stats.bytesTransferred += byteCount || 0;
        return this.emit('progress', this.stats);
    };
    PushTransfer.prototype.end = function () {
        this.emit('end');
    };
    PushTransfer.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    return PushTransfer;
}(events_1.EventEmitter));
exports.default = PushTransfer;
