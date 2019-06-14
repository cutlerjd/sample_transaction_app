/* tslint:disable:object-literal-sort-keys */
import { ConnectionOptions } from "typeorm";

const isProd: boolean = process.env.NODE_ENV === "production";

const entityString: string = process.env.DOCKERIZED === "true" ? isProd ? "/node/entity/*.js" : "/node/app/dist/entity/*.js" : "dist/entity/*.js";

const config: ConnectionOptions = {
    type: "postgres",
    port: Number(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [
            entityString,
        ],
    cli: {
       entitiesDir: entityString
    }
};
console.log(entityString);
export default config;
