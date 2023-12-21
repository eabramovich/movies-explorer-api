import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: "Поле name является обязательным",
      },
      minlength: [2, "Минимальная длина 2 символа"],
      maxLength: [30, "Максимальная длина 30 символов"],
    },
    password: {
      type: String,
      required: {
        value: true,
        message: "Поле password является обязательным",
      },
      select: false,
    },
    email: {
      type: String,
      required: {
        value: true,
        message: "Поле email является обязательным",
      },
      unique: true,
      validate: {
        validator: function (v) {
          return isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model('user', userSchema);
