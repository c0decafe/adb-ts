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
var filesystem_1 = __importDefault(require("../filesystem"));
var CpCommand = (function (_super) {
    __extends(CpCommand, _super);
    function CpCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CpCommand.prototype.intentArgs = function (options) {
        var args = [];
        if (!options) {
            return args;
        }
        else {
            if (options.verbose) {
                args.push('-v');
            }
            if (options.noClobber) {
                args.push('-n');
            }
            if (options.symlink) {
                args.push('-s');
            }
            if (options.interactive) {
                args.push('-i');
            }
            if (options.hardLink) {
                args.push('-l');
            }
            if (options.noFollowSymlinks) {
                args.push('-P');
            }
            if (options.followAllSymlinks) {
                args.push('-L');
            }
            if (options.followListedSymlinks) {
                args.push('-H');
            }
            if (options.archive) {
                args.push('-a');
            }
            else {
                if (options.recursive) {
                    args.push('-r');
                }
                if (options.noDereference) {
                    args.push('-d');
                }
                if (options.preserve) {
                    var params = options.preserve.all
                        ? ['all']
                        : Object.entries(options.preserve)
                            .filter(function (_a) {
                            var key = _a[0], value = _a[1];
                            return key !== 'all' && value;
                        })
                            .map(function (item) { return item[0]; });
                    args.push("--preserve=" + params.join(','));
                }
            }
            if (options.delFirst) {
                args.push('-F');
            }
            if (options.delDest) {
                args.push('-f');
            }
            return args;
        }
    };
    CpCommand.prototype.getCmd = function () {
        return 'cp';
    };
    CpCommand.prototype.execute = function (serial, paths, options) {
        return _super.prototype.execute.call(this, serial, paths, options);
    };
    return CpCommand;
}(filesystem_1.default));
exports.default = CpCommand;
