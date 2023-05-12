import mongoose from "mongoose";

const dataBase = () => {
  mongoose.connect("mongodb://localhost:27017/auth_argon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("database connected bang..."));
};

export default dataBase;
