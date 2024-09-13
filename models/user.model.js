const mongooes = require("mongoose");

const UserSchema = new mongooes.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
module.exports = mongooes.model("User", UserSchema);
