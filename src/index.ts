import express from 'express';
import { createConnection } from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transactions } from "./entities/Transaction";
import { createBankerRouter } from './routes/create_banker';
import { createClientRouter } from './routes/create_client';
import { createTransactionRouter } from './routes/create_transactions';
import { connectBankerToClient } from './routes/connect_banker_to_client';
import { deleteClientRouter } from './routes/delete_client';
import { deleteBankerRouter } from './routes/delete_banker';
import { fetchClientRouter } from './routes/fetch_clients';
import { fetchBankerRouter } from './routes/fetch_bankers';

const app= express();
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Kamn@1012",
      database: "banking",
      entities: [Client, Banker , Transactions],
      synchronize: true,
    });
    console.log("connected successfully!!!!");
    //middleware--
    app.use(express.json())
    app.use(createClientRouter)
    app.use(createBankerRouter)
    app.use(createTransactionRouter)
    app.use(connectBankerToClient)
    app.use(deleteClientRouter)
    app.use(deleteBankerRouter)
    app.use(fetchClientRouter)
    app.use(fetchBankerRouter)
    //server connection--
    app.listen(8080,()=> console.log("server is running at port 8080"))
  } catch (e) {
    console.log(e);
    throw new Error("unable to connect to db!!!!!!!!!");
  }
};
main();
