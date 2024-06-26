import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';
import isEmail from 'validator/lib/isEmail.js';

const movieSchema = new mongoose.Schema(
  {
    nameRU: {
      type: String,
      required: {
        value: true,
        message: 'Поле nameRU является обязательным',
      },
    },
    nameEN: {
      type: String,
      required: {
        value: true,
        message: 'Поле nameEN является обязательным',
      },
    },
    description: {
      type: String,
      required: {
        value: true,
        message: 'Поле nameRU является обязательным',
      },
    },
    director: {
      type: String,
      required: {
        value: true,
        message: 'Поле director является обязательным',
      },
    },
    country: {
      type: String,
      required: {
        value: true,
        message: 'Поле country является обязательным',
      },
    },
    year: {
      type: String,
      required: {
        value: true,
        message: 'Поле year является обязательным',
      },
    },
    duration: {
      type: Number,
      required: {
        value: true,
        message: 'Поле duration является обязательным',
      },
    },
    movieId: {
      type: Number,
      required: {
        value: true,
        message: 'Поле movieId является обязательным',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: {
        value: true,
        message: 'Поле owner яляется обязательным',
      },
    },
    thumbnail: {
      type: String,
      required: {
        value: true,
        message: 'Поле thumbnail яляется обязательным',
      },
      validate: {
        validator: (v) => isURL(v),
        message: (props) => `${props.value} is not a valid url`,
      },
    },
    trailerLink: {
      type: String,
      required: {
        value: true,
        message: 'Поле trailerLink яляется обязательным',
      },
      validate: {
        validator: (v) => isURL(v),
        message: (props) => `${props.value} is not a valid url`,
      },
    },
    image: {
      type: String,
      required: {
        value: true,
        message: 'Поле image яляется обязательным',
      },
      validate: {
        validator: (v) => isURL(v),
        message: (props) => `${props.value} is not a valid url`,
      },
    },
  },
  { versionKey: false, timestamps: true },
);

export default mongoose.model('movie', movieSchema);
