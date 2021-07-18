/// <reference types="node" />
export { default as AdbClient } from './client';
export { default as Command } from './command';
export { default as EmptyCommand } from './commands/empty-command';
export { default as ParseCommand } from './commands/parse-command';
export { default as RawCommand } from './commands/raw-command';
export { default as TransportCommand } from './commands/tranport';
export { default as TransportParseAllCommand } from './commands/transport-parse-all-command';
export { default as TransportParseValueCommand } from './commands/transport-parse-value-command';
export { default as ValueCommand } from './commands/value-command';
export { KeyCode } from './keycode';
export { default as LineTransform } from './linetransform';
export { default as Parser } from './parser';
export { default as Sync } from './sync';
export { default as Tracker } from './tracker';
import Command from './command';
import Connection from './connection';
import LogcatEntry from './logcat/entry';
export declare enum Priority {
    DEFAULT = 1,
    VERBOSE = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6,
    FATAL = 7,
    SILENT = 8
}
export declare enum Reply {
    OKAY = "OKAY",
    FAIL = "FAIL",
    STAT = "STAT",
    LIST = "LIST",
    DENT = "DENT",
    RECV = "RECV",
    DATA = "DATA",
    DONE = "DONE",
    SEND = "SEND",
    QUIT = "QUIT"
}
export declare function decodeLength(length: string): number;
export declare function encodeLength(length: number): string;
export declare function encodeData(data: any): Buffer;
export declare function stringToType(value: string): SimpleType;
export declare type DeviceState = 'offline' | 'device' | 'emulator' | 'unauthorized' | 'recovery' | 'no permissions';
export declare type AdbFlag = '-f' | '-d' | '-e' | '-g' | '-k' | '-s' | '-t' | '-3' | '-i' | '-u';
export declare type AdbExtraType = 'string' | 'null' | 'bool' | 'int' | 'long' | 'float' | 'uri' | 'component';
export declare type AdbExtra = {
    key: string;
    type: AdbExtraType;
    value: SimpleType | SimpleType[];
};
export interface StartServiceOptions {
    user?: number | string;
    action?: string;
    data?: string;
    mimeType?: string;
    category?: string | string[];
    flags?: AdbFlag | AdbFlag[];
    extras?: AdbExtra | AdbExtra[];
}
export interface StartActivityOptions extends StartServiceOptions {
    debug?: boolean;
    wait?: boolean;
}
export interface IAdbDevice {
    id: string;
    state: DeviceState;
    path: string;
    device?: string;
    model?: string;
    product?: string;
    transportId?: string;
    transport: TransportType;
}
export interface AdbError extends Error {
    errno?: number;
    code?: string;
    path?: string;
}
export declare type StatsObject = {
    bytesTransferred: number;
};
export interface ReversesObject {
    local: string;
    remote: string;
}
export interface ForwardsObject extends ReversesObject {
    serial: string;
}
export declare type SimpleType = string | boolean | number | null | undefined;
export declare type KeyStringObject = {
    [key: string]: SimpleType;
};
export interface InstallOptions {
    reinstall?: boolean;
    test?: boolean;
    internal?: boolean;
    allowDowngrade?: boolean;
    grandPermissions?: boolean;
    [key: string]: any;
}
export interface UninstallOptions {
    keepCache?: boolean;
}
export interface AdbClientOptions {
    port?: number;
    bin?: string;
    host?: string;
    noAutoStart?: boolean;
}
export interface LogcatOptions {
    clear?: boolean;
    filter?: (entry: LogcatEntry) => boolean;
}
export interface LogcatReaderOptions {
    fixLineFeeds?: boolean;
    filter?: (entry: LogcatEntry) => boolean;
}
export declare type TransportType = 'usb' | 'local' | 'any';
export declare type WaitForState = 'device' | 'recovery' | 'sideload' | 'bootloader';
export declare type SettingsMode = 'system' | 'global' | 'secure';
export declare type InputSource = 'dpad' | 'keyboard' | 'mouse' | 'touchpad' | 'gamepad' | 'touchnavigation' | 'joystick' | 'touchscreen' | 'stylus' | 'trackball';
export declare type InputType = 'text' | 'keyevent' | 'tap' | 'swipe' | 'draganddrop' | 'press' | 'roll';
export interface InputOptions {
    source?: InputSource;
}
export interface CommandConstruct {
    new (connection: Connection): Command;
}
export declare type MonkeyCallback<T = string> = (err: Error, value?: T, command?: string) => void;
declare type ForceFSOption = {
    force?: boolean;
};
declare type InteractiveFSOption = {
    interactive?: boolean;
};
declare type NoClobberFSOption = {
    noClobber?: boolean;
};
declare type VerboseFSoption = {
    verbose?: boolean;
};
declare type SymlinkFSoption = {
    symlink?: boolean;
};
declare type RecursiveFSOption = {
    recursive?: boolean;
};
export declare type RmOption = ForceFSOption & InteractiveFSOption & RecursiveFSOption;
export declare type MkDirOptions = VerboseFSoption & InputOptions & ForceFSOption & {
    mode?: number;
    parent?: boolean;
};
export declare type TouchOptions = SymlinkFSoption & {
    aTime?: boolean;
    mTime?: boolean;
    noCreate?: boolean;
    date?: Date | string;
    time?: Date | string;
    reference?: string;
};
export declare type MvOptions = NoClobberFSOption & VerboseFSoption & ForceFSOption & InteractiveFSOption;
export declare type PreserveOptions = {
    mode?: boolean;
    ownership?: boolean;
    timestamps?: boolean;
    context?: boolean;
    xattr?: boolean;
    all?: boolean;
};
export declare type CpOptions = VerboseFSoption & NoClobberFSOption & SymlinkFSoption & InteractiveFSOption & RecursiveFSOption & {
    hardLink?: boolean;
    noDereference?: boolean;
    noFollowSymlinks?: boolean;
    followAllSymlinks?: boolean;
    followListedSymlinks?: boolean;
    preserve?: PreserveOptions;
    delFirst?: boolean;
    delDest?: boolean;
    archive?: boolean;
};
export declare class FailError extends Error {
    constructor(message?: string);
}
export declare class UnexpectedDataError extends Error {
    unexpected: string;
    expected: string;
    constructor(unexpected: string, expected: string);
}
export declare class PrematureEOFError extends Error {
    missingBytes: number;
    constructor(howManyMissing: number);
}
