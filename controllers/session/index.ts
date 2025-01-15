import {NextFunction, Request, Response} from 'express';
import {Gender, OrderType} from "../../models/types";
import {errorHandler} from "../../utils/error-handler";
import Session from "../../models/session";
import {Response as ServerResponse} from "../../models/response";

function generateSessionId() {
    // generate 6 digit alphanumeric string
    const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let sessionId = "";
    for (let i = 0; i < 6; i++) {
        sessionId += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }
    return sessionId;
}

export async function checkSession(req: Request, res: Response, next: NextFunction) {
    if (req.params.sessionId === undefined || req.params.sessionId === null) {
        return new ServerResponse(res).json(400, "Session ID not provided", null)
    }

    const session = await Session.findOne({sessionId: req.params.sessionId})

    if (session === null) {
        return new ServerResponse(res).json(404, "Session not found", null)
    }

    switch (session.currentStep){
        case "clothingTypes":
            return new ServerResponse(res).json(200, "Session found", "/boutique/type")
        case "clothingPersonality":
            return new ServerResponse(res).json(200, "Session found", "/boutique/personality")
        case "review":
            return new ServerResponse(res).json(200, "Session found", "/boutique/review")
        default:
            return new ServerResponse(res).json(200, "Session found", "/boutique/thanks")
    }
}

export async function startSession(req: Request, res: Response, next: NextFunction) {
    if (req.body.sessionId === undefined) {
        return new ServerResponse(res).json(400, "Session ID not provided", null)
    }

    if(!req.body.data.about){
        return new ServerResponse(res).json(400, "About not provided", null)
    }

    const data_: {
        orderType: OrderType,
        gender: Gender,
        age: string,
        height: string,
        size: string,
        kids_clothing: [{
            gender: string,
            age: string,
            clothes_needed: string[],
        }] | []
    } | null | undefined = req.body.data.about

    await errorHandler([data_], res, req, next, async () => {
        const session = await Session.findOne({sessionId: req.body.sessionId})
        if (session === null) {
            const sessionId = generateSessionId()
            const currentStep = "about"

            const newSession = new Session({
                sessionId,
                currentStep,
                data: {
                    about: data_
                }
            })

            await newSession.save()
            return new ServerResponse(res).json(201, "Session started", sessionId);
        }

        session.data.about = req.body.data.about
        session.currentStep = "about"

        await session.save()
        return new ServerResponse(res).json(200, "Session updated", session.sessionId)
    })
}

export async function updateSession(req: Request, res: Response, next: NextFunction) {
    if (req.body.currentStep === undefined || req.body.currentStep === null) {
        return new ServerResponse(res).json(400, "Current step not provided", null)
    }

    if (req.body.sessionId === null || req.body.sessionId === undefined) {
        return new ServerResponse(res).json(400, "Session ID not provided", null)
    }

    const currentStep: "clothingTypes" | "clothingPersonality" | "review" | "thankYou" = req.body.currentStep
    const session = await Session.findOne({sessionId: req.body.sessionId})

    if (session === null) {
        return new ServerResponse(res).json(404, "Session not found", null)
    }

    try {
        switch (currentStep) {
            case "clothingTypes":
                if(!req.body.data.clothingTypes){
                    return new ServerResponse(res).json(400, "Clothing types not provided", null)
                }

                session.data["clothingTypes"] = req.body.data.clothingTypes
                session.currentStep = "clothingTypes"

                // At this point we need to check if the user is logged in
                if (req.body.userId) {
                    session.userId = req.body.userId
                }

                await session.save()
                return new ServerResponse(res).json(200, "Session updated", session.sessionId)

            case "clothingPersonality":
                if(!req.body.data.clothingPersonality){
                    return new ServerResponse(res).json(400, "Clothing personality not provided", null)
                }

                session.data["clothingPersonality"] = req.body.data.clothingPersonality
                session.currentStep = "clothingPersonality"

                if (req.body.phoneNumber) {
                    session.phoneNumber = req.body.phoneNumber
                }

                await session.save()
                return new ServerResponse(res).json(200, "Session updated", session.sessionId)

            case "review":
                if(!req.body.data.review){
                    return new ServerResponse(res).json(400, "Review not provided", null)
                }

                session.data.review = req.body.data.review
                session.currentStep = "review"
                session.userId = req.body.userId // The user has to be logged in/registered by now

                await session.save()
                return new ServerResponse(res).json(200, "Session updated", session.sessionId)

            case "thankYou":
                session.completed = true
                session.currentStep = "thankYou"

                await session.save()
                return new ServerResponse(res).json(200, "Session updated", session.sessionId)

            default:
                return new ServerResponse(res).json(400, "Invalid currentStep", null)
        }
    } catch (e: any) {
        return new ServerResponse(res).json(500, e.toString(), null)
    }
}

export async function getSession(req: Request, res: Response, next: NextFunction) {
    if (req.params.sessionId === undefined || req.params.sessionId === null) {
        return new ServerResponse(res).json(400, "Session ID not provided", null)
    }

    if(req.params.currentStep === undefined || req.params.currentStep === null){
        return new ServerResponse(res).json(400, "Current step not provided", null)
    }

    const session: any = await Session.findOne({sessionId: req.params.sessionId})

    if (session === null) {
        return new ServerResponse(res).json(404, "Session not found", null)
    }

    return new ServerResponse(res).json(200, "Session found", session.data[`${req.params.currentStep}`])
}
