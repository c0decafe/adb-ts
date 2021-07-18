import TransportParseAllCommand from '../transport-parse-all-command';
import Promise from 'bluebird';
export default class ListPackagesCommand extends TransportParseAllCommand {
    protected parse(value: string): any[];
    execute(serial: string): Promise<string[]>;
}
