import Promise from 'bluebird';
import { SimpleType } from "../..";
import TransportParseAllCommand from "../transport-parse-all-command";
export default class GetPropertyCommand extends TransportParseAllCommand {
    parse(value: any): string | number | boolean;
    execute(serial: string, prop: string): Promise<SimpleType>;
}
