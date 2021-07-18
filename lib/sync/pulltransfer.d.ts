/// <reference types="node" />
import { PassThrough } from "stream";
export default class PullTransfer extends PassThrough {
    private readonly stats;
    cancel(): void;
    write(chunk: Buffer, encoding?: BufferEncoding, cb?: (error: Error | null | undefined) => void): boolean;
    write(chunk: Buffer, cb?: (error: Error | null | undefined) => void): boolean;
}
