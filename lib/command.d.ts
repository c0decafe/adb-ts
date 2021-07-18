import Connection from './connection';
import Parser from './parser';
import Promise from 'bluebird';
export default abstract class Command implements Command {
    protected readonly connection: Connection;
    protected readonly parser: Parser;
    constructor(connection: Connection);
    getConnection(): Connection;
    getParser(): Parser;
    execute(...args: any[]): Promise<any>;
    escape(arg?: any): string;
    escapeCompat(arg?: any): string;
}
