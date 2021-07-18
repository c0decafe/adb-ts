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
var LineTransform = (function (_super) {
    __extends(LineTransform, _super);
    function LineTransform(options) {
        var _this = _super.call(this, options) || this;
        _this.transformNeeded = true;
        _this.skipBytes = 0;
        _this.savedR = null;
        _this.autoDetect = (options === null || options === void 0 ? void 0 : options.autoDetect) || false;
        return _this;
    }
    LineTransform.prototype.nullTransform = function (chunk, encoding, cb) {
        this.push(chunk);
        cb();
    };
    LineTransform.prototype._transform = function (chunk, encoding, cb) {
        if (this.autoDetect) {
            if (chunk[0] === 0x0a) {
                this.transformNeeded = false;
                this.skipBytes = 1;
            }
            else {
                this.skipBytes = 2;
            }
            this.autoDetect = false;
        }
        if (this.skipBytes) {
            var skip = Math.min(chunk.length, this.skipBytes);
            chunk = chunk.slice(skip);
            this.skipBytes -= skip;
        }
        if (!chunk.length) {
            return cb();
        }
        if (!this.transformNeeded) {
            return this.nullTransform(chunk, encoding, cb);
        }
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
    LineTransform.prototype._flush = function (cb) {
        if (this.savedR) {
            this.push(this.savedR);
        }
        return cb();
    };
    return LineTransform;
}(stream_1.Stream.Transform));
exports.default = LineTransform;
