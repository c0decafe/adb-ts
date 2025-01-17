import Stats from "./stats";
export default class SyncEntry extends Stats {
    readonly name: string;
    constructor(name: string, mode: number, size: number, mtime: number);
    toString(): string;
}
