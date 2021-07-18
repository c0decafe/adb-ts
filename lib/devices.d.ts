import { IAdbDevice } from '.';
import Command from './command';
import Promise from 'bluebird';
export declare function constructDevice(device: IAdbDevice): IAdbDevice;
export default class DevicesCommand extends Command {
    protected parse(value: string): any[];
    readDevices(): Promise<any[]>;
    execute(command: string): Promise<any>;
}
