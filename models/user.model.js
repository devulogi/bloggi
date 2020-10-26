const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (pwd) {
        return pwd.length > 6 ? true : false;
      },
    },
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.checkPassword = function (guess) {
  return this.password === guess ? true : false;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
