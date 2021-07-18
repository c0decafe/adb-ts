import TransportCommand from './tranport';
import Promise from 'bluebird';
export default class EmptyCommand extends TransportCommand {
    execute(serial: string, ...params: any[]): Promise<void>;
}
