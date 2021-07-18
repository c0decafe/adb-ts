/// <reference types="bluebird" />
import { MkDirOptions } from '../..';
import FileSystemCommand from '../filesystem';
export default class MkDirCommand extends FileSystemCommand {
    intentArgs(options?: MkDirOptions): string[];
    getCmd(): string;
    execute(serial: string, path: string, options?: MkDirOptions): import("bluebird")<string>;
}
