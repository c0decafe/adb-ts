import TransportCommand from '../tranport';
import Promise from 'bluebird';
export default class RootCommand extends TransportCommand {
    execute(serial: string): Promise<void>;
}
