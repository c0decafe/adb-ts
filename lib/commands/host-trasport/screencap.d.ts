/// <reference types="bluebird" />
import LineTransform from '../../linetransform';
import RawCommand from '../raw-command';
export default class ScreencapCommand extends RawCommand {
    execute(serial: string): import("bluebird")<LineTransform>;
}
