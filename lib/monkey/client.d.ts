/// <reference types="node" />
import { NetConnectOpts, Socket } from 'net';
import { MonkeyCallback } from '..';
import Api from './api';
import Command from './command';
import CommandQueue from './commandqueue';
export default class Monkey extends Api {
    readonly queue: Command[];
    private parser;
    protected stream: Socket;
    getStream(): Socket;
    send(commands: string[] | string, cb: MonkeyCallback): this;
    protected hook(): void;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'end', listener: VoidFunction): this;
    on(event: 'finish', listener: VoidFunction): this;
    private consume;
    connect(stream: Socket | NetConnectOpts): this;
    end(): this;
    commandQueue(): CommandQueue;
}
