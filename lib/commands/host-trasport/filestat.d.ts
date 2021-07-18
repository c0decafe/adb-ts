import Promise from 'bluebird';
import FileStats from '../../filestats';
import TransportParseAllCommand from '../transport-parse-all-command';
export default class FileStatCommand extends TransportParseAllCommand {
    protected parse(value: string): FileStats;
    execute(serial: string, path: string): Promise<FileStats>;
}
