/// <reference types="bluebird" />
import TransportCommand from "./tranport";
export default abstract class TransportParseValueCommand extends TransportCommand {
    abstract parse(value: string): any;
    execute(serial: string, ...args: string[]): import("bluebird")<any>;
}
