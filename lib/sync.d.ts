/// <reference types="node" />
import { EventEmitter } from 'events';
import { Readable } from 'stream';
import Connection from './connection';
import SyncEntry from './sync/entry';
import Stats from './sync/stats';
import PushTransfer from './sync/pushtransfer';
import Promise from 'bluebird';
import PullTransfer from './sync/pulltransfer';
export declare enum SyncMode {
    DEFAULT_CHMOD = 420,
    DATA_MAX_LENGTH = 65536
}
export default class Sync extends EventEmitter {
    private readonly connection;
    private readonly parser;
    constructor(connection: Connection);
    getConnection(): Connection;
    static temp(path: string): string;
    private enoent;
    private readError;
    private sendCommandWithLength;
    private writeData;
    private pushStream;
    private pushFile;
    push(contents: string | Readable, path: string, mode?: SyncMode): PushTransfer;
    private readData;
    pull(path: string): PullTransfer;
    readDir(path: string): Promise<SyncEntry[]>;
    end(): this;
    stat(path: string, cb?: Function): Promise<Stats>;
    private sendCommandWithArg;
}
