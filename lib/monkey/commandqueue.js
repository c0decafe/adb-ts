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
var command_1 = __importDefault(require("./command"));
var api_1 = __importDefault(require("./api"));
var Multi = (function (_super) {
    __extends(Multi, _super);
    function Multi(client) {
        var _this = _super.call(this) || this;
        _this.commands = [];
        _this.replies = [];
        _this.errors = [];
        _this.counter = 0;
        _this.sent = false;
        _this.client = client;
        _this.collector = function (err, result, cmd) {
            if (err) {
                _this.errors.push(cmd + ": " + err.message);
            }
            _this.replies.push(result);
            _this.counter -= 1;
            return _this.maybeFinish();
        };
        return _this;
    }
    Multi.prototype.maybeFinish = function () {
        var _this = this;
        if (!this.counter) {
            if (this.errors.length) {
                setImmediate(function () {
                    var _a;
                    (_a = _this.callback) === null || _a === void 0 ? void 0 : _a.call(_this, new Error(_this.errors.join(', ')));
                });
            }
            else {
                setImmediate(function () {
                    var _a;
                    (_a = _this.callback) === null || _a === void 0 ? void 0 : _a.call(_this, null, _this.replies);
                });
            }
        }
    };
    Multi.prototype.forbidReuse = function () {
        if (this.sent) {
            throw new Error("Reuse not supported");
        }
    };
    Multi.prototype.send = function (command) {
        this.forbidReuse();
        this.commands.push(new command_1.default(command, this.collector));
        return this;
    };
    Multi.prototype.execute = function (cb) {
        this.forbidReuse();
        this.counter = this.commands.length;
        this.sent = true;
        this.callback = cb;
        if (!this.counter)
            return;
        var parts = [];
        for (var _i = 0, _a = this.commands; _i < _a.length; _i++) {
            var command = _a[_i];
            this.client.queue.push(command);
            parts.push(command.command);
        }
        parts.push('');
        this.commands = [];
        this.client.getStream().write(parts.join('\n'));
    };
    return Multi;
}(api_1.default));
exports.default = Multi;
