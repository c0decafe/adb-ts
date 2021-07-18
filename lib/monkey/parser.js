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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var reply_1 = __importStar(require("./reply"));
var Parser = (function (_super) {
    __extends(Parser, _super);
    function Parser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.column = 0;
        _this.buffer = Buffer.from('');
        return _this;
    }
    Parser.prototype.parse = function (chunk) {
        this.buffer = Buffer.concat([this.buffer, chunk]);
        while (this.column < this.buffer.length) {
            if (this.buffer[this.column] === 0x0a) {
                this.parseLine(this.buffer.slice(0, this.column));
                this.buffer = this.buffer.slice(this.column + 1);
                this.column = 0;
            }
            this.column += 1;
        }
        if (this.buffer.length) {
            this.emit('wait');
        }
        else {
            this.emit('drain');
        }
    };
    Parser.prototype.parseLine = function (line) {
        switch (line[0]) {
            case 0x4f:
                if (line.length === 2) {
                    this.emit('reply', new reply_1.default(reply_1.ReplyType.OK, null));
                }
                else {
                    this.emit('reply', new reply_1.default(reply_1.ReplyType.OK, line.toString('ascii', 3)));
                }
                break;
            case 0x45:
                if (line.length === 5) {
                    this.emit('reply', new reply_1.default(reply_1.ReplyType.ERROR, null));
                }
                else {
                    this.emit('reply', new reply_1.default(reply_1.ReplyType.ERROR, line.toString('ascii', 6)));
                }
                break;
            default:
                this.emit('error', new SyntaxError("Unparseable line '" + line + "'"));
        }
    };
    Parser.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    return Parser;
}(events_1.EventEmitter));
exports.default = Parser;
