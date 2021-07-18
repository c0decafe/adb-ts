/// <reference types="bluebird" />
import Command from "../command";
export default class ValueCommand extends Command {
    execute(...params: any[]): import("bluebird")<string>;
}
