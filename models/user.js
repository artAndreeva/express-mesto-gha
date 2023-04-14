const mongoose = require('mongoose');
require('mongoose-type-url');

const userScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: mongoose.Schema.Types.Url,
    required: true,
  },
});

module.exports = mongoose.model('user', userScheme);
