import { StartServiceOptions } from '../..';
import TransportCommand from '../tranport';
import Promise from 'bluebird';
export default class StartServiceCommand extends TransportCommand {
    private formatExtraType;
    private formatExtraObject;
    private formatExtras;
    private intentArgs;
    execute(serial: string, pkg: string, service: string, options?: StartServiceOptions, command?: string): Promise<void>;
}
