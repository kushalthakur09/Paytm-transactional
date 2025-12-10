const { Types } = require("mongoose");
const z = require("zod");

const transferSchemaValidator =z.object({
  amount:z.number().positive("Amount must be greater than 0"),
  userId : z.string().refine((v)=> Types.ObjectId.isValid(v),"Invalid recipient Id")
})

module.exports ={
    transferSchemaValidator
}