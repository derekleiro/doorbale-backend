import {NextFunction, Response, Request} from "express";
import {Response as ServerResponse} from "../models/response";
import Session from "../models/session";

export async function errorHandler(checks: any[], res: Response, req: Request, next: NextFunction, callback: () => void, sessionId?: string){
    try {
        if (sessionId) {
            if(req.params.sessionId === undefined || req.params.sessionId === null){
                return new ServerResponse(res).json(400, "SessionId not provided", null)
            }

            const session: any = await Session.findOne({sessionId: req.params.sessionId})
            if (session === null) {
                return new ServerResponse(res).json(404, "Session not found", null)
            }
        }

        for (let check of checks) {
            if (!check) {
                return new ServerResponse(res).json(400, "Invalid request", null);
            }
        }

        callback();
    } catch (e: any) {
        return new ServerResponse(res).json(500, e.toString(), null);
    }
}