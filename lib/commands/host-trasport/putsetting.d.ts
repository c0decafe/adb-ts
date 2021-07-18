/// <reference types="bluebird" />
import { SettingsMode, SimpleType } from '../..';
import TransportCommand from '../tranport';
export default class PutSetting extends TransportCommand {
    execute(serial: string, mode: SettingsMode, name: string, value: SimpleType): import("bluebird")<void>;
}
