import { NetConnectOpts, Socket } from "net";
import { MonkeyCallback } from "..";
import Api from "./api";
import Command from "./command";
import CommandQueue from "./commandqueue";
import Parser from "./parser";
import Reply from "./reply";

export default class Monkey extends Api {
    public readonly queue: Command[] = [];
    private parser: Parser = new Parser();
    protected stream: Socket;

    getStream() {
        return this.stream;
    }

    send(commands: string[] | string, cb: MonkeyCallback) {
        if (Array.isArray(commands)) {
            for (const command of commands) {
                this.queue.push(new Command(command, cb));
            }
            this.stream.write((commands.join('\n')) + "\n");
        }
        else {
            this.queue.push(new Command(commands, cb));
            this.stream.write("" + commands + "\n");
        }
        return this;
    }

    protected hook() {
        this.stream?.on('data', (data) => {
            return this.parser.parse(data);
        });
        this.stream?.on('error', (err) => {
            return this.emit('error', err);
        });
        this.stream?.on('end', () => {
            return this.emit('end');
        });
        this.stream?.on('finish', () => {
            return this.emit('finish');
        });
        this.parser.on('reply', (reply) => {
            return this.consume(reply);
        });
        this.parser.on('error', (err) => {
            return this.emit('error', err);
        });
    }

    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'end', listener: VoidFunction): this;
    on(event: 'finish', listener: VoidFunction): this;
    on(event: string | symbol, listener: (...args: any[]) => void) {
        return super.on(event, listener);
    }
    private consume(reply: Reply) {
        const command = this.queue.shift();
        if (command) {
            if (reply.isError()) {
                command.callback?.(reply.toError(), null, command.command);
            }
            else {
                command.callback?.(null, reply.value, command.command);
            }
        }
        else {
            throw new Error("Command queue depleted, but replies still coming in");
        }
    }

    connect(stream: Socket | NetConnectOpts) {
        this.stream = stream as Socket;
        this.hook();
        return this;
    }

    end() {
        this.stream?.end();
        return this;
    }

    commandQueue() {
        return new CommandQueue(this);
    }
}