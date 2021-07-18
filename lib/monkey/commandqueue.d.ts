import Api from "./api";
import Monkey from "./client";
export default class Multi extends Api {
    private client;
    private commands;
    private replies;
    private errors;
    private counter;
    private sent;
    private callback?;
    private collector;
    constructor(client: Monkey);
    private maybeFinish;
    private forbidReuse;
    send(command: string): this;
    execute(cb: (err?: Error, data?: string[]) => void): void;
}
