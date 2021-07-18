import ValueCommand from '../value-command';
import Promise from 'bluebird';
export default class GetDevicePathCommand extends ValueCommand {
    execute(serial: string): Promise<string>;
}
