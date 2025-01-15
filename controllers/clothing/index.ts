import {NextFunction, Request, Response} from "express";
import {Response as ServerResponse} from "../../models/response";
import {errorHandler} from "../../utils/error-handler";
import ClothingType from "../../models/clothing_type";

export async function getClothing(req: Request, res: Response, next: NextFunction) {
    const clothingType = req.params.type
    const sessionId = req.params.sessionId;
    if(clothingType === undefined || clothingType === null){
        return new ServerResponse(res).json(400, "Clothing type not provided", null)
    }

    await errorHandler([], res, req, next, async () => {
        const clothes = await ClothingType.find({type: req.params.type})
        return new ServerResponse(res).json(200, "Clothing fetched", clothes)
    }, clothingType !== "kids" ? sessionId : undefined)
}