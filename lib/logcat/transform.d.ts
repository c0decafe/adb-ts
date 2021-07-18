/// <reference types="node" />
import { Stream } from "stream";
export default class Transform extends Stream.Transform {
    private savedR?;
    _transform(chunk: Buffer, encoding: BufferEncoding, cb: VoidFunction): void;
}
