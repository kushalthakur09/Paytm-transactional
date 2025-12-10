const moongose = require("mongoose");

module.exports = connectToDB = async () => {
  const dbURI = "mongodb://127.0.0.1:27017/paytm";
  try {
    const conn = await moongose.connect(dbURI);
    console.log("✅ MongoDB Connected!");
    console.log("📍 Hostname:", conn.connection.host);
    console.log("📁 Database Name:", conn.connection.name);
    console.log("🔌 Port:", conn.connection.port);
    console.log("📊 Ready State:", conn.connection.readyState);
    console.log("👥 Host:", conn.connection.host);
    return conn.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
