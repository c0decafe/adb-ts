/// <reference types="node" />
import { EventEmitter } from "events";
import { Writable } from "stream";
import { LogcatReaderOptions } from "..";
import LogcatEntry from "./entry";
export default class LogcatReader extends EventEmitter {
    private filter?;
    private parser;
    private stream;
    private options;
    constructor(options?: LogcatReaderOptions);
    setFilter(filter: (entry: LogcatEntry) => boolean): void;
    hook(): void;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'entry', listener: (entry: LogcatEntry) => void): this;
    on(event: 'finish' | 'end', listener: VoidFunction): this;
    connect(stream: Writable): this;
    end(): this;
}
