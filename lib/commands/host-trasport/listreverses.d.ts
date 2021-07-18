import Promise from 'bluebird';
import { ReversesObject } from '../..';
import TransportParseValueCommand from '../transport-parse-value-command';
export default class ListReversesCommand extends TransportParseValueCommand {
    parse(value: string): any[];
    execute(serial: string): Promise<ReversesObject[]>;
}
