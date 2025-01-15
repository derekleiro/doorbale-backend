import {NextFunction, Request, Response} from 'express';
import {errorHandler} from "../../utils/error-handler";
import {Response as ServerResponse} from "../../models/response";
import Session from "../../models/session";
import Customer from "../../models/customer";
import Delivery from "../../models/delivery";
import {Types} from "mongoose";

export async function phoneLogin(req: Request, res: Response) {
    // login logic
}

export async function phoneRegister(req: Request, res: Response, next: NextFunction) {
    // register logic

    if(!req.body.name || !req.body.email || !req.body.phoneNumber || !req.body.address || !req.body.area || !req.body.coordinates){
        return new ServerResponse(res).json(400, "Invalid request", null)
    }

    try {
        const data: {
            name: string,
            email: string,
            phoneNumber: string,
            address: string,
            area: string,
            coordinates: {
                lat: Number,
                lng: Number,
            }
        } = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            area: req.body.area,
            coordinates: req.body.coordinates
        }
        await errorHandler([], res, req, next, async () => {
            const session = await Session.findOne({sessionId: req.params.sessionId})

            const age = session!.data.about.age
            const gender = session!.data.about.gender
            const height = session!.data.about.height
            const size = session!.data.about.size
            const phone_number = data.phoneNumber
            const email_address = data.email

            const newCustomer = new Customer({
                gender,
                age,
                height,
                size,
                phone_number,
                email_address,
            })

            const savedCustomer = await newCustomer.save()
            const customerId = savedCustomer._id

            const newDeliveryAddress = new Delivery({
                address: data.address,
                area: data.area,
                coordinates: data.coordinates,
                customer_id: customerId,
            })

            const savedAddress = await newDeliveryAddress.save()
            return new ServerResponse(res).json(200, "Customer saved", {
                addressId: savedAddress._id,
                customerId: customerId,
                deliveryDetails: savedAddress
            })
        }, req.params.sessionId)
    } catch (e: any) {
        return new ServerResponse(res).json(500, e.toString(), null)
    }
}

export async function emailLogin(req: Request, res: Response) {
    // login logic
}

export async function emailRegister(req: Request, res: Response) {
    // register logic
}

export async function verifyEmail2FA(req: Request, res: Response) {
    // 2FA verification logic
}

export async function verifyPhone2FA(req: Request, res: Response) {
    // 2FA verification logic
}

export async function verifyPIN(req: Request, res: Response) {
    // PIN verification logic
}

export async function getAccount(req: Request, res: Response) {
    // get account logic
}
