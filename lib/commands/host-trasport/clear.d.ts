/// <reference types="bluebird" />
import TransportCommand from '../tranport';
export default class ClearCommand extends TransportCommand {
    execute(serial: string, pkg: string): import("bluebird")<void>;
}
