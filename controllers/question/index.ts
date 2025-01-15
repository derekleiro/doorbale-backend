import {NextFunction, Request, Response} from "express";
import {Response as ServerResponse} from "../../models/response";
import Question from "../../models/question";
import {errorHandler} from "../../utils/error-handler";

export async function getQuestions(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.params.sessionId;
    await errorHandler([], res, req, next, async () => {
        const questions = await Question.find({})
        return new ServerResponse(res).json(200, "Questions fetched", questions)
    }, sessionId)
}
