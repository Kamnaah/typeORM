import express from "express";
import { Client } from "../entities/Client";
import { Transactions, TransactionTypes } from "../entities/Transaction";

const router = express.Router();

interface TransactionRequestType {
  clientId: string;
}
router.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params as TransactionRequestType;

  const { type, amount } = req.body;

  const client = await Client.findOne({ where: { id: parseInt(clientId) } });

  if (!client) {
    return res.json({
      msg: "client not found",
    });
  }

  // console.log(amount , type , client)

  const transaction = await Transactions.create({
    amount,
    type,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.DEPOSITE) {
    client.balance = Number(client.balance) + parseInt(amount);
    client.transaction = [transaction];
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance = Number(client.balance) - parseInt(amount);
    client.transaction = [transaction];
  }

  await client.save();
  return res.json(client);
});

export { router as createTransactionRouter };
