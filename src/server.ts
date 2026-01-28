import express from "express";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import users from "../data/users.json";

const app = express();

app.use(express.json());
app.use(cookieParser());


const registeredUsers: Map<string, string> = new Map([
  ["alice", "1234"],
  ["bob", "secret"],
  ["charlie", "qwerty"],
]);

const sessions: Map<string, string> = new Map(); // sessionId -> username

app.post("/auth/login", (req, res) => {
  console.log("BODY:", req.body);
 

  const { username, password } = req.body;

  // Check ob username und password existieren
  if (!username || !password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Existiert User?
  const savedPassword = registeredUsers.get(username);
  if (!savedPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Passwort korrekt?
  if (savedPassword !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Session erstellen
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, username);

  // Cookie setzen (httpOnly!)
  res.cookie("sessionId", sessionId, {
    httpOnly: true,
  });

  return res.json({ message: "Login succeeded" });
});



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

  const greeting =
    lang === "en"
      ? `Hello ${name}`
      : `Hallo ${name}`;

  res.json({
    message: greeting,
  });
});

 app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
