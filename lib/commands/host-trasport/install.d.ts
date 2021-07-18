/// <reference types="bluebird" />
import { InstallOptions } from '../..';
import TransportCommand from '../tranport';
export default class InstallCommand extends TransportCommand {
    private intentArgs;
    execute(serial: string, apk: string, options?: InstallOptions, args?: string): import("bluebird")<void>;
}
