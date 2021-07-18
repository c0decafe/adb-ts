/// <reference types="bluebird" />
import { StartActivityOptions } from "../..";
import StartServiceCommand from "./startservice";
export default class StartActivityCommand extends StartServiceCommand {
    execute(serial: string, pkg: string, activity: string, options?: StartActivityOptions): import("bluebird")<void>;
}
