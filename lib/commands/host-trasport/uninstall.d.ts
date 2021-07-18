/// <reference types="bluebird" />
import { UninstallOptions } from '../..';
import TransportCommand from '../tranport';
export default class UninstallCommand extends TransportCommand {
    execute(serial: string, pkg: string, options?: UninstallOptions): import("bluebird")<void>;
}
