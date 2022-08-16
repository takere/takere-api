require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: false,
      default: '',
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum : ['user','admin'],
      default: 'user'
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    profileUrl: {
      type: String,
      trim: true,
      lowercase: true,
    }
  },
  {
    usePushEach: true,
    timestamps: true,
    versionKey: false
  })

UserSchema.statics.findByEmail = async function (email) {
  const User = this
  return User.findOne({email});
}

UserSchema.statics.findById = async function (id) {
  const User = this
  return new Promise (async (resolve, reject) => {
    let user = await User.findOne({ _id: id })
    if (!user) reject(401)
    resolve(user)
  })
}

UserSchema.statics.createUser = async function (firstName, lastName, password, email, profileUrl) {
  const User = this.model('User')
  const salt = await bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
  const hashedPassword = await bcrypt.hashSync(password, salt);
  let user = new User({firstName, lastName, password: hashedPassword, email, profileUrl})
  await user.save()
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileUrl: user.profileUrl
  }
}

UserSchema.pre("save", function(next) {
  next();
});

const User = new mongoose.model('User', UserSchema)
module.exports = User
