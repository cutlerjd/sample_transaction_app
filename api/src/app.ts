import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import "dotenv/config";
import config from "./ormconfig";
import {createConnection} from "typeorm";
import categoryRouter from "./routes/categoryRouter";
import transactionRouter from "./routes/transactionRouter";

createConnection(config)
.then(async (connection) => {
    const app = express();
    const port = Number(process.env.PORT);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/category", categoryRouter);
    app.use("/transaction", transactionRouter);

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.listen( port, () => {
        // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    });

}).catch((error) => {
    console.log(error);
});
