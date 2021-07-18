/// <reference types="node" />
import { Socket, SocketConstructorOpts } from 'net';
import Parser from './parser';
export default class Connection extends Socket {
    private readonly parser;
    constructor(options?: SocketConstructorOpts);
    connect(options: any, connectionListener?: () => void): this;
    connect(port: number, host: string, connectionListener?: () => void): this;
    connect(port: number, connectionListener?: () => void): this;
    connect(path: string, connectionListener?: () => void): this;
    getParser(): Parser;
}
