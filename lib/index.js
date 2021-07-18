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
exports.PrematureEOFError = exports.UnexpectedDataError = exports.FailError = exports.stringToType = exports.encodeData = exports.encodeLength = exports.decodeLength = exports.Reply = exports.Priority = exports.Tracker = exports.Sync = exports.Parser = exports.LineTransform = exports.KeyCode = exports.ValueCommand = exports.TransportParseValueCommand = exports.TransportParseAllCommand = exports.TransportCommand = exports.RawCommand = exports.ParseCommand = exports.EmptyCommand = exports.Command = exports.AdbClient = void 0;
var client_1 = require("./client");
Object.defineProperty(exports, "AdbClient", { enumerable: true, get: function () { return __importDefault(client_1).default; } });
var command_1 = require("./command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return __importDefault(command_1).default; } });
var empty_command_1 = require("./commands/empty-command");
Object.defineProperty(exports, "EmptyCommand", { enumerable: true, get: function () { return __importDefault(empty_command_1).default; } });
var parse_command_1 = require("./commands/parse-command");
Object.defineProperty(exports, "ParseCommand", { enumerable: true, get: function () { return __importDefault(parse_command_1).default; } });
var raw_command_1 = require("./commands/raw-command");
Object.defineProperty(exports, "RawCommand", { enumerable: true, get: function () { return __importDefault(raw_command_1).default; } });
var tranport_1 = require("./commands/tranport");
Object.defineProperty(exports, "TransportCommand", { enumerable: true, get: function () { return __importDefault(tranport_1).default; } });
var transport_parse_all_command_1 = require("./commands/transport-parse-all-command");
Object.defineProperty(exports, "TransportParseAllCommand", { enumerable: true, get: function () { return __importDefault(transport_parse_all_command_1).default; } });
var transport_parse_value_command_1 = require("./commands/transport-parse-value-command");
Object.defineProperty(exports, "TransportParseValueCommand", { enumerable: true, get: function () { return __importDefault(transport_parse_value_command_1).default; } });
var value_command_1 = require("./commands/value-command");
Object.defineProperty(exports, "ValueCommand", { enumerable: true, get: function () { return __importDefault(value_command_1).default; } });
var keycode_1 = require("./keycode");
Object.defineProperty(exports, "KeyCode", { enumerable: true, get: function () { return keycode_1.KeyCode; } });
var linetransform_1 = require("./linetransform");
Object.defineProperty(exports, "LineTransform", { enumerable: true, get: function () { return __importDefault(linetransform_1).default; } });
var parser_1 = require("./parser");
Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return __importDefault(parser_1).default; } });
var sync_1 = require("./sync");
Object.defineProperty(exports, "Sync", { enumerable: true, get: function () { return __importDefault(sync_1).default; } });
var tracker_1 = require("./tracker");
Object.defineProperty(exports, "Tracker", { enumerable: true, get: function () { return __importDefault(tracker_1).default; } });
var Priority;
(function (Priority) {
    Priority[Priority["DEFAULT"] = 1] = "DEFAULT";
    Priority[Priority["VERBOSE"] = 2] = "VERBOSE";
    Priority[Priority["DEBUG"] = 3] = "DEBUG";
    Priority[Priority["INFO"] = 4] = "INFO";
    Priority[Priority["WARN"] = 5] = "WARN";
    Priority[Priority["ERROR"] = 6] = "ERROR";
    Priority[Priority["FATAL"] = 7] = "FATAL";
    Priority[Priority["SILENT"] = 8] = "SILENT";
})(Priority = exports.Priority || (exports.Priority = {}));
var Reply;
(function (Reply) {
    Reply["OKAY"] = "OKAY";
    Reply["FAIL"] = "FAIL";
    Reply["STAT"] = "STAT";
    Reply["LIST"] = "LIST";
    Reply["DENT"] = "DENT";
    Reply["RECV"] = "RECV";
    Reply["DATA"] = "DATA";
    Reply["DONE"] = "DONE";
    Reply["SEND"] = "SEND";
    Reply["QUIT"] = "QUIT";
})(Reply = exports.Reply || (exports.Reply = {}));
function decodeLength(length) {
    return parseInt(length, 16);
}
exports.decodeLength = decodeLength;
function encodeLength(length) {
    return ('0000' + length.toString(16)).slice(-4).toUpperCase();
}
exports.encodeLength = encodeLength;
function encodeData(data) {
    if (!Buffer.isBuffer(data)) {
        data = Buffer.from(data);
    }
    return Buffer.concat([Buffer.from(encodeLength(data.length)), data]);
}
exports.encodeData = encodeData;
function stringToType(value) {
    var num = Number(value);
    if (isNaN(num) || value === '') {
        switch (value) {
            case '':
                return undefined;
            case 'true':
                return true;
            case 'false':
                return false;
            case 'null':
                return null;
            default:
                return value;
        }
    }
    else {
        return num;
    }
}
exports.stringToType = stringToType;
var FailError = (function (_super) {
    __extends(FailError, _super);
    function FailError(message) {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, PrematureEOFError.prototype);
        _this.name = 'FailError';
        _this.message = "Failure: " + message;
        Error.captureStackTrace(_this);
        return _this;
    }
    return FailError;
}(Error));
exports.FailError = FailError;
var UnexpectedDataError = (function (_super) {
    __extends(UnexpectedDataError, _super);
    function UnexpectedDataError(unexpected, expected) {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, PrematureEOFError.prototype);
        _this.name = 'UnexpectedDataError';
        _this.message = "Unexpected '" + unexpected + "', was expecting " + expected;
        _this.unexpected = unexpected;
        _this.expected = expected;
        Error.captureStackTrace(_this);
        return _this;
    }
    return UnexpectedDataError;
}(Error));
exports.UnexpectedDataError = UnexpectedDataError;
var PrematureEOFError = (function (_super) {
    __extends(PrematureEOFError, _super);
    function PrematureEOFError(howManyMissing) {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, PrematureEOFError.prototype);
        _this.name = 'PrematureEOFError';
        _this.message =
            'Premature end of stream, needed ' + howManyMissing + ' more bytes';
        _this.missingBytes = howManyMissing;
        Error.captureStackTrace(_this);
        return _this;
    }
    return PrematureEOFError;
}(Error));
exports.PrematureEOFError = PrematureEOFError;
