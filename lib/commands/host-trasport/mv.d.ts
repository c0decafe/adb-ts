/// <reference types="bluebird" />
import { MvOptions } from '../..';
import FileSystemCommand from '../filesystem';
export default class MvCommand extends FileSystemCommand {
    intentArgs(options?: MvOptions): string[];
    getCmd(): string;
    execute(serial: string, paths: string[], options?: MvOptions): import("bluebird")<string>;
}
