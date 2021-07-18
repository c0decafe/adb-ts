/// <reference types="bluebird" />
import TransportCommand from '../tranport';
export default class InputCommand extends TransportCommand {
    execute(serial: string, param1: string, param2: string, ...args: any[]): import("bluebird")<void>;
}
