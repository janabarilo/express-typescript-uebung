import express from "express";

const app = express();

app.get("/echo", (req, res) => {
  res.send("Echo");
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
