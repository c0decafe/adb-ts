/// <reference types="bluebird" />
import { TouchOptions } from '../..';
import FileSystemCommand from '../filesystem';
export default class TouchCommand extends FileSystemCommand {
    intentArgs(options?: TouchOptions): string[];
    getCmd(): string;
    execute(serial: string, path: string, options?: TouchOptions): import("bluebird")<string>;
}
