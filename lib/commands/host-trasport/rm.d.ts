/// <reference types="node" />
/// <reference types="bluebird" />
import { RmOptions } from 'fs';
import FileSystemCommand from '../filesystem';
export default class RmCommand extends FileSystemCommand {
    intentArgs(options?: RmOptions): string[];
    getCmd(): string;
    execute(serial: string, path: string, options?: RmOptions): import("bluebird")<string>;
}
