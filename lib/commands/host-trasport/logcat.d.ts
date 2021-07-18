import LineTransform from '../../linetransform';
import RawCommand from '../raw-command';
import Promise from 'bluebird';
import { LogcatOptions } from '../..';
export default class LogcatCommand extends RawCommand {
    execute(serial: string, options?: LogcatOptions): Promise<LineTransform>;
}
