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
var events_1 = require("events");
var binary_1 = __importDefault(require("./parser/binary"));
var transform_1 = __importDefault(require("./transform"));
var LogcatReader = (function (_super) {
    __extends(LogcatReader, _super);
    function LogcatReader(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.filter = options.filter;
        _this.parser = new binary_1.default();
        return _this;
    }
    LogcatReader.prototype.setFilter = function (filter) {
        this.filter = filter;
    };
    LogcatReader.prototype.hook = function () {
        var _this = this;
        if (this.options.fixLineFeeds) {
            var transform = this.stream.pipe(new transform_1.default());
            transform.on('data', function (data) {
                return _this.parser.parse(data);
            });
        }
        else {
            this.stream.on('data', function (data) {
                return _this.parser.parse(data);
            });
        }
        this.stream.on('error', function (err) {
            _this.emit('error', err);
        });
        this.stream.on('end', function () {
            _this.emit('end');
        });
        this.stream.on('finish', function () {
            _this.emit('finish');
        });
        this.parser.on('entry', function (entry) {
            if (_this.filter) {
                if (_this.filter(entry))
                    _this.emit('entry', entry);
            }
            else
                _this.emit('entry', entry);
        });
        this.parser.on('error', function (err) {
            _this.emit('error', err);
        });
    };
    LogcatReader.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    LogcatReader.prototype.connect = function (stream) {
        this.stream = stream;
        this.hook();
        return this;
    };
    ;
    LogcatReader.prototype.end = function () {
        this.stream.end();
        return this;
    };
    ;
    return LogcatReader;
}(events_1.EventEmitter));
exports.default = LogcatReader;
