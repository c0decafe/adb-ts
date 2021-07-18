import { KeyStringObject } from '../..';
import TransportParseAllCommand from '../transport-parse-all-command';
import Promise from 'bluebird';
export default class ListPropertiesCommand extends TransportParseAllCommand {
    protected parse(value: string): KeyStringObject;
    execute(serial: string): Promise<KeyStringObject>;
}
