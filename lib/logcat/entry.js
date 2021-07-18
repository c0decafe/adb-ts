"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogcatEntry = (function () {
    function LogcatEntry() {
        this.date = new Date();
        this.pid = -1;
        this.tid = -1;
        this.priority = null;
        this.tag = null;
        this.message = null;
    }
    LogcatEntry.prototype.setDate = function (date) {
        this.date = date;
    };
    LogcatEntry.prototype.setPid = function (pid) {
        this.pid = pid;
    };
    LogcatEntry.prototype.setTid = function (tid) {
        this.tid = tid;
    };
    LogcatEntry.prototype.setPriority = function (priority) {
        this.priority = priority;
    };
    ;
    LogcatEntry.prototype.setTag = function (tag) {
        this.tag = tag;
    };
    ;
    LogcatEntry.prototype.setMessage = function (message) {
        this.message = message;
    };
    ;
    LogcatEntry.prototype.toBinary = function () {
        var length = 20;
        length += 1;
        length += this.tag.length;
        length += 1;
        length += this.message.length;
        length += 1;
        var buffer = Buffer.alloc(length);
        var cursor = 0;
        buffer.writeUInt16LE(length - 20, cursor);
        cursor += 4;
        buffer.writeInt32LE(this.pid, cursor);
        cursor += 4;
        buffer.writeInt32LE(this.tid, cursor);
        cursor += 4;
        buffer.writeInt32LE(Math.floor(this.date.getTime() / 1000), cursor);
        cursor += 4;
        buffer.writeInt32LE((this.date.getTime() % 1000) * 1000000, cursor);
        cursor += 4;
        buffer[cursor] = this.priority;
        cursor += 1;
        buffer.write(this.tag, cursor, this.tag.length);
        cursor += this.tag.length;
        buffer[cursor] = 0x00;
        cursor += 1;
        buffer.write(this.message, cursor, this.message.length);
        cursor += this.message.length;
        buffer[cursor] = 0x00;
        return buffer;
    };
    return LogcatEntry;
}());
exports.default = LogcatEntry;
