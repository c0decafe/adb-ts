/// <reference types="bluebird" />
import TransportCommand from '../tranport';
export default class WaitBootCompleteCommand extends TransportCommand {
    execute(serial: string): import("bluebird")<void>;
}
