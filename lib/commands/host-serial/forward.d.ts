import Command from '../../command';
import Promise from 'bluebird';
export default class ForwardCommand extends Command {
    execute(serial: string, local: string, remote: string): Promise<void>;
}
