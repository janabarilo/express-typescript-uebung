import express from "express";

const app = express();

app.get("/echo", (req, res) => {
  res.send("Echo");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
