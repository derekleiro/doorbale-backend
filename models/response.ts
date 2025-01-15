import { Response as ExpressResponse } from 'express';
export class Response {
    private readonly _res: any | null = null;

    constructor(res: ExpressResponse) {
        this._res = res;
    }

    json = (status: number, message: string, body: any) => {

        this._res.status(status).json({
            message,
            status,
            body,
        });
    }
    // TODO: Add a logger

    res = this._res;
}
