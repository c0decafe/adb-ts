/// <reference types="node" />
import { Stream, TransformOptions } from "stream";
interface LineTransformOptions extends TransformOptions {
    autoDetect: boolean;
}
export default class LineTransform extends Stream.Transform {
    private savedR;
    private autoDetect;
    private transformNeeded;
    private skipBytes;
    constructor(options?: LineTransformOptions);
    nullTransform(chunk: Buffer, encoding: BufferEncoding, cb: Function): void;
    _transform(chunk: Buffer, encoding: BufferEncoding, cb: Function): any;
    _flush(cb: Function): any;
}
export {};
