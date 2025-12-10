const express = require("express");
const { Account } = require("../model/Account");
const z = require("zod");
const { authMiddleware } = require("../middleware/auth");
const { default: mongoose, Types } = require("mongoose");
const { transferSchemaValidator } = require("../utils/accountSchema");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({userId:req.userId});
    return res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
        session.startTransaction();
        const {amount,to}=req.body;
        const {success}=transferSchemaValidator.safeParse({amount,userId:to});

        if(!success){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Invalid Input found"
            })
        }
        const fromAccount=await Account.findOne({userId:req.userId}).session(session);
        if(!fromAccount || fromAccount.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message : "Insufficient Balance"
            });
        }

        const toAccount = await Account.findOne({userId : to}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Receiver account not found"
            })
        }
        await Account.updateOne({userId :req.userId},{$inc : {balance : -amount} } ).session(session);
        await Account.updateOne({userId :to},{$inc : {balance : amount} } ).session(session);

        await session.commitTransaction();

        return res.status(200).json({
            message : "Amount Transfered Successfully"
        })
  } catch (error) {
    console.log(error);
    
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        message: error.errors[0].message,
      });
    }
    
    return res.status(500).json({ error: "Server error" });
  }finally {
    await session.endSession();
  }
});

module.exports = router;
