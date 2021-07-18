/// <reference types="node" />
import { EventEmitter } from "events";
import { IAdbDevice } from ".";
import AdbClient from "./client";
import AdbDevice from "./device";
import DevicesCommand from './devices';
export default class Tracker extends EventEmitter {
    private readonly command;
    private deviceMap;
    private reader;
    private readonly client;
    constructor(command: DevicesCommand, client: AdbClient);
    private read;
    private update;
    end(): void;
    on(event: 'add' | 'change', listener: (device: AdbDevice) => void): this;
    on(event: 'remove', listener: (device: IAdbDevice) => void): this;
    on(event: 'end', listener: () => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
}
