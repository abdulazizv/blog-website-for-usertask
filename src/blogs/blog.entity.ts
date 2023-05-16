export class Blog {
    constructor(
        private readonly _message:string,
        private readonly _authorId: number,
        image?:string
    ) {}

    get message():string {
        return this._message;
    }

    get authorId():number {
        return this._authorId;
    }
}