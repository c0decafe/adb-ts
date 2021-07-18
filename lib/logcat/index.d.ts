/// <reference types="node" />
import { Writable } from 'stream';
import { LogcatReaderOptions } from '..';
import { default as Reader } from './reader';
export default class Logcat {
    static readStrem(stream: Writable, options: LogcatReaderOptions): Reader;
    static readonly Reader: typeof Reader;
}
