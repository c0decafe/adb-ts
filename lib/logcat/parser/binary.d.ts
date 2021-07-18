/// <reference types="node" />
import LogcatEntry from "../entry";
import Parser from "../parser";
export default class Binary extends Parser {
    private buffer;
    private readonly HEADER_SIZE_V1;
    private readonly HEADER_SIZE_MAX;
    constructor();
    parse(chunk: Buffer): void;
    private processEntry;
    on(event: 'entry', listener: (entry: LogcatEntry) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'wait' | 'drain', listener: () => void): this;
}
