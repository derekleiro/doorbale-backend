import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import util from "util";
import {Response} from "./models/response";
import * as mongoose from "mongoose";
import {clerkMiddleware} from '@clerk/express'

import SessionRoutes from "./routes/session";
import ClothingTypeRoutes from "./routes/clothing_type";
import QuestionsRoutes from "./routes/question";
import AuthRoutes from "./routes/auth";
import HttpError from "./models/http-error";

require("dotenv").config();

// Logging write stream
const logFile = fs.createWriteStream("app.log", {flags: "a"});
console.log = function () {
    // @ts-ignore
    logFile.write(util.format.apply(null, arguments) + "\n");
    // @ts-ignore
    process.stdout.write(util.format.apply(null, arguments) + "\n");
};

console.error = function () {
    // @ts-ignore
    logFile.write(util.format.apply(null, arguments) + "\n");
    // @ts-ignore
    process.stderr.write(util.format.apply(null, arguments) + "\n");
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/", SessionRoutes);
app.use("/api/", ClothingTypeRoutes)
app.use("/api/", QuestionsRoutes)
app.use("/api/", AuthRoutes)

app.use((req, res, next) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_SERVER!);
        res.setHeader(
            "Access-Control-Allow-Method",
            "OPTIONS, POST, GET, PUT, PATH, DELETE"
        );
    } catch (e) {
        console.error(e);
    }
    next();
});

app.use((req, res, next) => {
    throw new HttpError("Could not find this route");
});

app.use((error: any, req: any, res: any, next: any) => {
    if (res.headerSent) {
        return next(error);
    }
    new Response(res).json(error.code || 500, error.message || "An unknown error has occurred", null);
});

mongoose
    .connect(process.env.MONGODB_URI!)
    .then((result) => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at ${process.env.PORT}`);
        });
    })
    .catch((e) => {
        console.error(e);
    });
