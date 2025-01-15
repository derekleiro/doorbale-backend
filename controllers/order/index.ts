import {Request, Response, NextFunction} from 'express';
import {errorHandler} from "../../utils/error-handler";

export async function newOrder(req: Request, res: Response) {
    // process order logic
}

export async function getOrder(req: Request, res: Response, next: NextFunction) {
    // get order logic

    // Variables needed
    const {
        orderType,
        customerAge,
        customerHeight,
        customerSize, testScores,
        styleReferences,
        clothingTypes,
        authToken,
    } = req.body;

    await errorHandler(
        [orderType, customerAge, customerHeight, customerSize, testScores, styleReferences, clothingTypes],
        res,
        next,
        () => {
            // process order logic
        })

}
