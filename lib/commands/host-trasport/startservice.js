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
var __1 = require("../..");
var tranport_1 = __importDefault(require("../tranport"));
var StartServiceCommand = (function (_super) {
    __extends(StartServiceCommand, _super);
    function StartServiceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartServiceCommand.prototype.formatExtraType = function (type) {
        switch (type) {
            case 'string':
                return 's';
            case 'null':
                return 'sn';
            case 'bool':
                return 'z';
            case 'int':
                return 'i';
            case 'long':
            case 'float':
                return 'l';
            case 'uri':
                return 'u';
            case 'component':
                return 'cn';
        }
    };
    StartServiceCommand.prototype.formatExtraObject = function (extra) {
        var args = [];
        var type = this.formatExtraType(extra.type);
        if (extra.type === 'null') {
            args.push("--e" + type);
            args.push(this.escape(extra.key));
        }
        else if (Array.isArray(extra.value)) {
            args.push("--e" + type + "a");
            args.push(this.escape(extra.key));
            args.push(this.escape(extra.value.join(',')));
        }
        else {
            args.push("--e" + type);
            args.push(this.escape(extra.key));
            args.push(this.escape(extra.value));
        }
        return args;
    };
    StartServiceCommand.prototype.formatExtras = function (extras) {
        if (!extras) {
            return [];
        }
        var result = [];
        if (Array.isArray(extras)) {
            for (var _i = 0, extras_1 = extras; _i < extras_1.length; _i++) {
                var item = extras_1[_i];
                result.push.apply(result, this.formatExtraObject(item));
            }
            return result;
        }
        else {
            result.push.apply(result, this.formatExtraObject(extras));
            return result;
        }
    };
    StartServiceCommand.prototype.intentArgs = function (options) {
        var _this = this;
        var args = [];
        if (options.extras) {
            args.push.apply(args, this.formatExtras(options.extras));
        }
        if (options.action) {
            args.push('-a', this.escape(options.action));
        }
        if (options.data) {
            args.push('-d', this.escape(options.data));
        }
        if (options.mimeType) {
            args.push('-t', this.escape(options.mimeType));
        }
        if (options.category) {
            if (Array.isArray(options.category)) {
                options.category.forEach((function (category) {
                    return args.push('-c', _this.escape(category));
                }));
            }
            else {
                args.push('-c', this.escape(options.category));
            }
        }
        if (options.flags) {
            args.push('-f', this.escape(options.flags));
        }
        return args;
    };
    StartServiceCommand.prototype.execute = function (serial, pkg, service, options, command) {
        var _this = this;
        options = options || {};
        var args = this.intentArgs(options);
        if (options.debug) {
            args.push('-D');
        }
        if (options.wait) {
            args.push('-W');
        }
        var name = (service.indexOf('.') > 0
            ? pkg + "/" + service
            : pkg + "/." + service);
        args.push('-n', this.escape(name));
        args.push('--user', this.escape(options.user || 0));
        command = command || 'shell:am startservice ';
        return _super.prototype.execute.call(this, serial, command, args.join(' '))
            .then(function (reply) {
            switch (reply) {
                case __1.Reply.OKAY:
                    return _this.parser.searchLine(/^Error: (.*)$/)
                        .finally(function () {
                        return _this.parser.end();
                    })
                        .then(function (match) {
                        throw new Error(match[1]);
                    })
                        .catch(__1.PrematureEOFError, function (err) {
                        return;
                    });
                case __1.Reply.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return StartServiceCommand;
}(tranport_1.default));
exports.default = StartServiceCommand;
