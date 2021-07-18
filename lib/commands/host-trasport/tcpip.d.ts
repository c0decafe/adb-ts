/// <reference types="bluebird" />
import TransportCommand from '../tranport';
export default class TcpIpCommand extends TransportCommand {
    execute(serial: string, port: number | string, host: string): import("bluebird")<string>;
}
