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
var filestats_1 = __importDefault(require("../../filestats"));
var transport_parse_all_command_1 = __importDefault(require("../transport-parse-all-command"));
var FileStatCommand = (function (_super) {
    __extends(FileStatCommand, _super);
    function FileStatCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileStatCommand.prototype.parse = function (value) {
        var props = value.split('\\_');
        if (props.length === 1) {
            throw new Error(value.trim());
        }
        var parsed = {
            abits: parseInt(props[0], 8),
            aflags: props[1],
            blocks: Number(props[2]),
            bytes: Number(props[3]),
            seccon: props[4],
            dev: Number(props[5]),
            mode: parseInt(props[7], 16),
            type: props[8],
            gid: Number(props[9]),
            gname: props[10],
            nlink: Number(props[11]),
            ino: Number(props[12]),
            moutpoint: props[13],
            name: props[14],
            lname: props[15],
            blksize: Number(props[16]),
            size: Number(props[17]),
            dTypeMajor: parseInt(props[18], 16),
            dTypeMinor: parseInt(props[19], 16),
            uid: Number(props[20]),
            uname: props[21],
            atime: new Date(props[22]),
            atimeMs: Number(props[23]),
            mtime: new Date(props[24]),
            mtimeMs: Number(props[25]),
            ctime: new Date(props[26]),
            ctimeMs: Number(props[27]),
        };
        return new filestats_1.default(parsed);
    };
    FileStatCommand.prototype.execute = function (serial, path) {
        var flags = [
            'a',
            'A',
            'b',
            'B',
            'C',
            'd',
            'D',
            'f',
            'F',
            'g',
            'G',
            'h',
            'i',
            'm',
            'n',
            'N',
            'o',
            's',
            't',
            'T',
            'u',
            'U',
            'x',
            'X',
            'y',
            'Y',
            'z',
            'Z',
        ];
        return _super.prototype.execute.call(this, serial, "shell:stat -c \"%" + flags.join('\\_%') + "\"", path);
    };
    return FileStatCommand;
}(transport_parse_all_command_1.default));
exports.default = FileStatCommand;
