/// <reference types="bluebird" />
import TransportCommand from '../tranport';
export default class TcpCommand extends TransportCommand {
    execute(port: number | string, host?: string): import("bluebird")<import("../../connection").default>;
}
