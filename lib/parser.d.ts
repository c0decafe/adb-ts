/// <reference types="node" />
import Promise from 'bluebird';
import { Writable } from 'stream';
import Connection from './connection';
export default class Parser {
    private readonly stream;
    private ended;
    constructor(stream: Connection);
    readBytes(howMany: number): Promise<Buffer>;
    end(): Promise<unknown>;
    readAscii(howMany: number): Promise<string>;
    readValue(): Promise<Buffer>;
    readError(): Promise<never>;
    unexpected(data: string, expected: string): Promise<never>;
    readByteFlow(howMany: number, targetStream: Writable): Promise<unknown>;
    private readUntil;
    private readline;
    searchLine(regExp: RegExp): Promise<string[]>;
    readAll(): Promise<Buffer>;
}
