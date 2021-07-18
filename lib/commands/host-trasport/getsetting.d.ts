import { SettingsMode, SimpleType } from "../..";
import TransportParseAllCommand from "../transport-parse-all-command";
import Promise from 'bluebird';
export default class GetSetting extends TransportParseAllCommand {
    protected parse(value: string): string | number | boolean;
    execute(serial: string, mode: SettingsMode, name: string): Promise<SimpleType>;
}
