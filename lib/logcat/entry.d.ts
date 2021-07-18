/// <reference types="node" />
import { Priority } from "..";
export default class LogcatEntry {
    date: Date;
    pid: number;
    tid: number;
    priority: Priority;
    tag: string;
    message: string;
    constructor();
    setDate(date: Date): void;
    setPid(pid: number): void;
    setTid(tid: number): void;
    setPriority(priority: Priority): void;
    setTag(tag: string): void;
    setMessage(message: string): void;
    toBinary(): Buffer;
}
