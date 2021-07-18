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
var entry_1 = __importDefault(require("../entry"));
var parser_1 = __importDefault(require("../parser"));
var Binary = (function (_super) {
    __extends(Binary, _super);
    function Binary() {
        var _this = _super.call(this) || this;
        _this.HEADER_SIZE_V1 = 20;
        _this.HEADER_SIZE_MAX = 100;
        _this.buffer = Buffer.from('');
        return _this;
    }
    Binary.prototype.parse = function (chunk) {
        this.buffer = Buffer.concat([this.buffer, chunk]);
        while (this.buffer.length > 4) {
            var cursor = 0;
            var length_1 = this.buffer.readUInt16LE(cursor);
            cursor += 2;
            var headerSize = this.buffer.readUInt16LE(cursor);
            if (headerSize < this.HEADER_SIZE_V1 || headerSize > this.HEADER_SIZE_MAX) {
                headerSize = this.HEADER_SIZE_V1;
            }
            cursor += 2;
            if (this.buffer.length < headerSize + length_1) {
                break;
            }
            var entry = new entry_1.default();
            entry.setPid(this.buffer.readInt32LE(cursor));
            cursor += 4;
            entry.setTid(this.buffer.readInt32LE(cursor));
            cursor += 4;
            var sec = this.buffer.readInt32LE(cursor);
            cursor += 4;
            var nsec = this.buffer.readInt32LE(cursor);
            entry.setDate(new Date(sec * 1000 + nsec / 1000000));
            cursor += 4;
            cursor = headerSize;
            var data = this.buffer.slice(cursor, cursor + length_1);
            cursor += length_1;
            this.buffer = this.buffer.slice(cursor);
            this.processEntry(entry, data);
        }
        if (this.buffer.length) {
            this.emit('wait');
        }
        else {
            this.emit('drain');
        }
    };
    Binary.prototype.processEntry = function (entry, data) {
        entry.setPriority(data[0]);
        var cursor = 1;
        var length = data.length;
        while (cursor < length) {
            if (data[cursor] === 0) {
                entry.setTag(data.slice(1, cursor).toString());
                entry.setMessage(data.slice(cursor + 1, length - 1).toString());
                this.emit('entry', entry);
                return;
            }
            cursor += 1;
        }
        this.emit('error', new Error("Unprocessable entry data '" + data + "'"));
    };
    Binary.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    return Binary;
}(parser_1.default));
exports.default = Binary;
