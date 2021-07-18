import TransportCommand from "./tranport";
import Promise from 'bluebird';
export default class RawCommand extends TransportCommand {
    execute(serial: string, ...params: any[]): Promise<any>;
}
