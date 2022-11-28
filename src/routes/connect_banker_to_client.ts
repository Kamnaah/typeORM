import  express from 'express';
import { Client } from '../entities/Client';
import { Banker } from '../entities/Banker';
const router=express.Router();

interface TransactionRequestType {
  clientId: string;
  bankerId: string;
}

router.put("/api/banker/:bankerId/client/:clientId", async (req, res)=>{
  const {bankerId , clientId} = req.params as TransactionRequestType;
  const client = await Client.findOne({ where: { id: parseInt(clientId) } });

  const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } });

  if (banker && client) {
    banker.clients = [client];
    await banker.save();
    return res.json({
      msg: 'banker connected to client',
    });
  } else {
    return res.json({
      msg: 'banker or client not found',
    });
  }
})

export {
  router as connectBankerToClient
}