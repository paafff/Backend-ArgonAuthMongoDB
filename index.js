import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import dataBase from "./config/Database.js";
import AuthRoute from "./routes/AuthRoute.js";
import MongoStore from "connect-mongo";
import session from "express-session";

dotenv.config();

const app = express();

mongoose.connect("mongodb://localhost:27017/auth_argon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("database connected bang..."));

// const sessionStore = new MongoStore({
//   mongooseConnection: mongoose.connection,
//   collection: "users",
// });

// note myself:terdapat file config untuk mendeklarasikan dan mengatur database,
// tetapi jika menggunakan mongodb lebih baik melakukan deklarasi dan pada index.js in,
// karena ketika dideklarasikan pada file terpisah dan ketika ada perubahan akan terjadi error,
// karena fungsi" tersebut dipanggil hanya ketika page pertama kali di load, bukan ketika setiap ada perubahan pada database
// kecuali metode tersebut digunakan jika menggunakan mysql dengan library sequelize

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/auth_argon",
      collection: "users",
    }),
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("server jalan bang");
});
