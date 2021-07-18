/// <reference types="node" />
import { EventEmitter } from "events";
export default abstract class Parser extends EventEmitter {
    abstract parse(...data: any[]): any;
}
