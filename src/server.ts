import express from "express";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import users from "../data/users.json";
import tweetRouter from "./routes/tweet.routes.js";
import userRouter from "./routes/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());


const registeredUsers: Map<string, string> = new Map([
  ["alice", "1234"],
  ["bob", "secret"],
  ["charlie", "qwerty"],
]);

const sessions: Map<string, string> = new Map(); // sessionId -> username

type Tweet = {
  id: string;
  text: string;
  author: string;
};

type AuthedRequest = express.Request & { user?: string; tweet?: Tweet };




const checkAuth = (req: any, res: any, next: any) => {
  const sessionId = req.cookies.sessionid; // oder sessionId (je nachdem wie du es nutzt)

  if (!sessionId) {
    return res.status(401).json({ error: "Please sign in" });
  }

  const username = sessions.get(sessionId);

  if (!username) {
    return res.status(401).json({ error: "Please sign in" });
  }

  req.user = username;
  next();
};


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
  res.cookie("sessionid", sessionId, {
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

app.get("/auth/me", (req, res) => {
  const sessionId = req.cookies.sessionid;

  if (!sessionId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const username = sessions.get(sessionId);

  if (!username) {
    return res.status(401).json({ error: "Invalid session" });
  }

  return res.status(200).json({ username });
});

app.get("/me", (req, res) => {
  const sessionId = req.cookies.sessionid; // oder sessionId (je nachdem wie du es im Code nutzt)

  if (!sessionId) {
    return res.status(401).json({ error: "Not signed in" });
  }

  const username = sessions.get(sessionId);

  if (!username) {
    return res.status(401).json({ error: "Not signed in" });
  }

  return res.json({ user: username });
});

app.post("/auth/logout", (req, res) => {
  const sessionId = req.cookies.sessionid; // oder sessionId (je nachdem wie du es nutzt)

  if (sessionId) {
    sessions.delete(sessionId);
  }

  res.clearCookie("sessionid"); // muss exakt gleich heißen wie beim Login!
  return res.json({
    success: true,
    message: "Logged out",
  });
});



app.use(tweetRouter);

app.use(userRouter);

app.use(errorMiddleware);



app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
