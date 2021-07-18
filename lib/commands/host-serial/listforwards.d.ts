import { ForwardsObject } from '../..';
import ParseCommand from '../parse-command';
import Promise from 'bluebird';
export default class ListForwardsCommand extends ParseCommand {
    parse(value: string): ForwardsObject[];
    execute(serial: string): Promise<ForwardsObject[]>;
}
