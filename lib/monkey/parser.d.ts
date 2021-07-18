/// <reference types="node" />
import { EventEmitter } from "events";
import Reply from "./reply";
export default class Parser extends EventEmitter {
    private column;
    private buffer;
    parse(chunk: Buffer): void;
    private parseLine;
    on(event: 'wait' | 'drain', listener: VoidFunction): this;
    on(event: 'reply', listener: (reply: Reply) => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
}
