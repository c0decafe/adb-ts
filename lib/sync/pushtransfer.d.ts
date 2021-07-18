/// <reference types="node" />
import { EventEmitter } from "events";
import { StatsObject } from "..";
export default class PushTransfer extends EventEmitter {
    private readonly stack;
    private readonly stats;
    cancel(): void;
    push(byteCount: number): void;
    pop(): boolean;
    end(): void;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'end' | 'cancel', listener: () => void): this;
    on(event: 'progress', listener: (stats: StatsObject) => void): this;
}
