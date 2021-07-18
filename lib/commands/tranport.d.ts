import Promise from 'bluebird';
import Command from '../command';
export default class TransportCommand extends Command {
    execute(serial: string, ...args: any[]): Promise<any>;
}
