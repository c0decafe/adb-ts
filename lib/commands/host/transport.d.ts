/// <reference types="bluebird" />
import Command from "../../command";
export default class HostTransportCommand extends Command {
    execute(serial: string): import("bluebird")<true>;
}
