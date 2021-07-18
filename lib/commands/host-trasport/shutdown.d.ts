import TransportCommand from '../tranport';
import Promise from 'bluebird';
export default class ShutdownCommand extends TransportCommand {
    execute(serial: string): Promise<void>;
}
