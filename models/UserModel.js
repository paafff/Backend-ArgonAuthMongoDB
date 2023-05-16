import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

const userSchema = mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// userSchema = schema, Users = database table name
const userDB = mongoose.model("users", userSchema);

export default userDB;

// const userSchema = mongoose.Schema({
//   uuid: { type: String, required: true, unique: true, default: uuidv4() },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true },
// });
