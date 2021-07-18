import TransportCommand from '../tranport';
import Promise from 'bluebird';
export default class RebootCommand extends TransportCommand {
    execute(serial: string): Promise<void>;
}
