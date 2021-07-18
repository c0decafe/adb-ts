export declare enum ReplyType {
    ERROR = "ERROR",
    OK = "OK"
}
export default class Reply {
    type: ReplyType;
    value: string;
    constructor(type: ReplyType, value: string);
    isError(): boolean;
    toError(): Error;
}
