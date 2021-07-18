import Promise from 'bluebird';
import TransportCommand from '../tranport';
export default class MonkeyCommand extends TransportCommand {
    execute(serial: string, port: number | string): Promise<import("../../connection").default>;
}
