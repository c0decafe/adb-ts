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
var stream_1 = require("stream");
var PullTransfer = (function (_super) {
    __extends(PullTransfer, _super);
    function PullTransfer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stats = {
            bytesTransferred: 0
        };
        return _this;
    }
    PullTransfer.prototype.cancel = function () {
        this.emit('cancel');
    };
    PullTransfer.prototype.write = function (chunk, encoding, cb) {
        this.stats.bytesTransferred += chunk.length;
        this.emit('progress', this.stats);
        return _super.prototype.write.call(this, chunk, encoding, cb);
    };
    return PullTransfer;
}(stream_1.PassThrough));
exports.default = PullTransfer;
