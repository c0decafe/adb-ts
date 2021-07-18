import { MonkeyCallback } from "..";
export default class Command {
    command: string;
    callback: MonkeyCallback;
    next?: MonkeyCallback;
    constructor(command: string, callback: MonkeyCallback);
}
