/// <reference types="bluebird" />
import TransportCommand from './tranport';
export default abstract class FileSystemCommand extends TransportCommand {
    protected abstract intentArgs(options?: Record<string, any>): string[];
    protected abstract getCmd(): string;
    private isError;
    execute(serial: string, path: string | string[], options?: Record<string, any>): import("bluebird")<string>;
}
