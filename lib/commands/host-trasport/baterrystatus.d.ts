import TransportParseAllCommand from '../transport-parse-all-command';
import Promise from 'bluebird';
import { KeyStringObject } from '../..';
export default class BatteryStatusCommand extends TransportParseAllCommand {
    parse(value: string): KeyStringObject;
    execute(serial: string): Promise<KeyStringObject>;
}
