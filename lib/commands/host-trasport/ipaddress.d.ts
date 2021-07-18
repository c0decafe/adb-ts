import Promise from 'bluebird';
import TransportCommand from '../tranport';
export default class GetIpAddressCommand extends TransportCommand {
    execute(serial: string): Promise<string | undefined>;
}
