/// <reference types="bluebird" />
import Sync from '../../sync';
import TransportCommand from '../tranport';
export default class SyncCommand extends TransportCommand {
    execute(serial: string): import("bluebird")<Sync>;
}
