import Promise from 'bluebird';
import { SimpleType } from "../..";
import TransportParseAllCommand from "../transport-parse-all-command";
export default class ShellCommand extends TransportParseAllCommand {
    protected parse(value: string): string | number | boolean;
    execute(serial: string, command: string | string[]): Promise<SimpleType>;
}
