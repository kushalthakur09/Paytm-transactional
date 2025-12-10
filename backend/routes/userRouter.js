const express = require("express");
const { User } = require("../model/User");
const { Account } = require("../model/Account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const { JWT_SECRET } = require("../config/config");
const {
  signUpSchemaValidator,
  signInSchemaValidator,
} = require("../utils/authSchema");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { success } = signUpSchemaValidator.safeParse(body);
    if (!success) {
      return res
        .status(400)
        .json({ message: "Email Already taken / Invalid User Inputs" });
    }

    const existingUser = await User.findOne({ username: body.username });

    if (existingUser && existingUser._id) {
      return res
        .status(400)
        .json({ message: "Email Already taken / Invalid User Inputs" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const savedUser = await User.create({ ...body, password: hashedPassword });


   const savedAccount= await Account.create({
      userId:savedUser._id,
      balance : Math.floor((Math.random() * Math.random()) * 9901)+100
    })

    const token = jwt.sign(
      {
        userId: savedUser._id,
      },
      JWT_SECRET
    );

    return res.status(201).json({
      message: "User Created Successfully",
      token,
      username:savedUser.username,
      firstName:savedUser.firstName,
      lastName:savedUser.lastName,
      balance:savedAccount.balance
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        message: error.errors[0].message,
      });
    }
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const body = req.body;
    const { success } = signInSchemaValidator.safeParse(body);
    if (!success) {
      return res.status(400).json({ message: "Invalid User Inputs" });
    }
    const { username, password } = body;
    const existingUser = await User.findOne({ username });

    if (!existingUser || !existingUser._id) {
      return res.status(404).json({ message: "User not found" });
    }

    const account= await Account.findOne({userId:existingUser._id});
    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      JWT_SECRET
    );

    return res.status(200).json({
      message: "User Signed In Successfully",
      token,
      username:existingUser.username,
      firstName:existingUser.firstName,
      lastName:existingUser.lastName,
      balance:account.balance
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        message: error.errors[0].message,
      });
    }
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res.status(200).json({
      users: allUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });
    return res.status(200).json({
      users:users.map(user => ({
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        _id:user._id
      }))
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
