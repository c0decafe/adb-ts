import { KeyStringObject, SettingsMode } from '../..';
import Promise from 'bluebird';
import TransportParseAllCommand from '../transport-parse-all-command';
export default class ListSettingsCommand extends TransportParseAllCommand {
    parse(value: any): KeyStringObject;
    execute(serial: string, mode: SettingsMode): Promise<KeyStringObject>;
}
