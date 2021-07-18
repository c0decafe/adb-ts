/// <reference types="bluebird" />
import EmptyCommand from '../empty-command';
export default class RemountCommand extends EmptyCommand {
    execute(serial: string): import("bluebird")<void>;
}
