/// <reference types="bluebird" />
import Command from '../../command';
export default class VersionCommand extends Command {
    execute(): import("bluebird")<number>;
}
