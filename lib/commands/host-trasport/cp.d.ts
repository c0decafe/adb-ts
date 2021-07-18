/// <reference types="bluebird" />
import { CpOptions } from '../..';
import FileSystemCommand from '../filesystem';
export default class CpCommand extends FileSystemCommand {
    intentArgs(options?: CpOptions): string[];
    getCmd(): string;
    execute(serial: string, paths: string[], options?: CpOptions): import("bluebird")<string>;
}
