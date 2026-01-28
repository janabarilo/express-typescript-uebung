import express from "express";
import users from "../data/users.json";


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

app.get("/greet", (req, res) => {
  const name = req.query.name as string;
  const lang = req.query.lang as string;

  if (!name) {
    return res.status(400).json({
      message: "Name query parameter is required",
    });
  }

  app.get("/users", (req, res) => {
  res.status(200).json(users);
});

  const greeting =
    lang === "en"
      ? `Hello ${name}`
      : `Hallo ${name}`;

  res.json({
    message: greeting,
  });
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
