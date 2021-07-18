/// <reference types="bluebird" />
import TransportCommand from "./tranport";
export default abstract class TransportParseAllCommand extends TransportCommand {
    protected abstract parse(value: string): any;
    execute(serial: string, ...args: any[]): import("bluebird")<any>;
}
