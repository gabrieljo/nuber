import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectionOptions from "./ormConfig";
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);
//설정된 옵션들로 데이터베이스와 앱을 연결해주도록 작업
createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch(error => console.log(error));
