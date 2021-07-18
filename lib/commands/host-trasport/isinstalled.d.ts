/// <reference types="node" />
/// <reference types="bluebird" />
import { Readable } from 'stream';
import TransportCommand from '../tranport';
export default class IsInstalledCommand extends TransportCommand {
    execute(serial: string, pkg: string | Readable): import("bluebird")<boolean>;
}
