import Command from '../../command';
import Promise from 'bluebird';
export default class KillCommand extends Command {
    execute(): Promise<void>;
}
