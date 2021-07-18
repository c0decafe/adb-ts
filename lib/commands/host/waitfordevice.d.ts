import Command from '../../command';
import { WaitForState, TransportType } from '../..';
import Promise from 'bluebird';
export default class WaitForDeviceCommand extends Command {
    execute(tranport: TransportType, state: WaitForState): Promise<void>;
}
