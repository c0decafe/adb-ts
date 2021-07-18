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
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transform.prototype._transform = function (chunk, encoding, cb) {
        var lo = 0;
        var hi = 0;
        if (this.savedR) {
            if (chunk[0] !== 0x0a) {
                this.push(this.savedR);
            }
            this.savedR = null;
        }
        var last = chunk.length - 1;
        while (hi <= last) {
            if (chunk[hi] === 0x0d) {
                if (hi === last) {
                    this.savedR = chunk.slice(last);
                    break;
                }
                else if (chunk[hi + 1] === 0x0a) {
                    this.push(chunk.slice(lo, hi));
                    lo = hi + 1;
                }
            }
            hi += 1;
        }
        if (hi !== lo) {
            this.push(chunk.slice(lo, hi));
        }
        cb();
    };
    return Transform;
}(stream_1.Stream.Transform));
exports.default = Transform;
