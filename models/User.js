import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail.js';
import NotAuthenticateError from '../errors/not-authenticate-err.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: 'Поле name является обязательным',
      },
      minlength: [2, 'Минимальная длина 2 символа'],
      maxLength: [30, 'Максимальная длина 30 символов'],
    },
    password: {
      type: String,
      required: {
        value: true,
        message: 'Поле password является обязательным',
      },
      select: false,
    },
    email: {
      type: String,
      required: {
        value: true,
        message: 'Поле email является обязательным',
      },
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: (props) => `${props.value} is not a valid email`,
      },
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthenticateError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotAuthenticateError('Неправильные почта или пароль');
        }

        return user;
      });
    });
};

export default mongoose.model('user', userSchema);
