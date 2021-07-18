/// <reference types="bluebird" />
import TransportCommand from '../tranport';
export default class UsbCommand extends TransportCommand {
    execute(serial: string): import("bluebird")<void>;
}
