const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index")
const connectDB = require("./db/db");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);

startServer = async () => {
  try {
    const conn = await connectDB();
    const hostname = conn.host;

    app.listen(8080, "0.0.0.0", () => {
      console.log(`🚀 Backend running on Port:${8080}`);
      console.log(`📊 MongoDB connected to: ${hostname}:27017/paytm`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
