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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("./api"));
var command_1 = __importDefault(require("./command"));
var commandqueue_1 = __importDefault(require("./commandqueue"));
var parser_1 = __importDefault(require("./parser"));
var reply_1 = __importStar(require("./reply"));
var Monkey = (function (_super) {
    __extends(Monkey, _super);
    function Monkey() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queue = [];
        _this.parser = new parser_1.default();
        return _this;
    }
    Monkey.prototype.getStream = function () {
        return this.stream;
    };
    Monkey.prototype.send = function (commands, cb) {
        var _this = this;
        var _a, _b, _c, _d;
        if (Array.isArray(commands)) {
            for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
                var command = commands_1[_i];
                this.queue.push(new command_1.default(command, cb));
            }
            this.stream.write(commands.join('\n') + '\n');
        }
        else {
            this.queue.push(new command_1.default(commands, cb));
            this.stream.write('' + commands + '\n');
        }
        var hadError = true;
        var handler = function () {
            hadError = false;
        };
        var removeListeners = function () {
            _this.stream.removeListener('data', handler);
            _this.stream.removeListener('error', handler);
            _this.stream.removeListener('end', handler);
            _this.stream.removeListener('finish', handler);
        };
        (_a = this.stream) === null || _a === void 0 ? void 0 : _a.on('data', handler);
        (_b = this.stream) === null || _b === void 0 ? void 0 : _b.on('error', handler);
        (_c = this.stream) === null || _c === void 0 ? void 0 : _c.on('end', handler);
        (_d = this.stream) === null || _d === void 0 ? void 0 : _d.on('finish', handler);
        setTimeout(function () {
            if (hadError)
                _this.consume(new reply_1.default(reply_1.ReplyType.ERROR, 'Command failed'));
            removeListeners();
        }, 100);
        return this;
    };
    Monkey.prototype.hook = function () {
        var _this = this;
        var _a, _b, _c, _d;
        (_a = this.stream) === null || _a === void 0 ? void 0 : _a.on('data', function (data) {
            return _this.parser.parse(data);
        });
        (_b = this.stream) === null || _b === void 0 ? void 0 : _b.on('error', function (err) {
            return _this.emit('error', err);
        });
        (_c = this.stream) === null || _c === void 0 ? void 0 : _c.on('end', function () {
            return _this.emit('end');
        });
        (_d = this.stream) === null || _d === void 0 ? void 0 : _d.on('finish', function () {
            return _this.emit('finish');
        });
        this.parser.on('reply', function (reply) {
            return _this.consume(reply);
        });
        this.parser.on('error', function (err) {
            return _this.emit('error', err);
        });
    };
    Monkey.prototype.on = function (event, listener) {
        return _super.prototype.on.call(this, event, listener);
    };
    Monkey.prototype.consume = function (reply) {
        var _a, _b;
        var command = this.queue.shift();
        if (command) {
            if (reply.isError()) {
                (_a = command.callback) === null || _a === void 0 ? void 0 : _a.call(command, reply.toError(), null, command.command);
            }
            else {
                (_b = command.callback) === null || _b === void 0 ? void 0 : _b.call(command, null, reply.value, command.command);
            }
        }
        else {
            throw new Error('Command queue depleted, but replies still coming in');
        }
    };
    Monkey.prototype.connect = function (stream) {
        this.stream = stream;
        this.stream.setMaxListeners(100);
        this.hook();
        return this;
    };
    Monkey.prototype.end = function () {
        var _a;
        (_a = this.stream) === null || _a === void 0 ? void 0 : _a.end();
        return this;
    };
    Monkey.prototype.commandQueue = function () {
        return new commandqueue_1.default(this);
    };
    return Monkey;
}(api_1.default));
exports.default = Monkey;
