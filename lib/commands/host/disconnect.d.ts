/// <reference types="bluebird" />
import Command from '../../command';
export default class DisconnectCommand extends Command {
    execute(host: string, port: number | string): import("bluebird")<string>;
}
