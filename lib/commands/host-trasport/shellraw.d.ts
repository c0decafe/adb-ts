/// <reference types="bluebird" />
import RawCommand from '../raw-command';
export default class ShellRawCommand extends RawCommand {
    execute(serial: string, command: string | string[]): import("bluebird")<any>;
}
