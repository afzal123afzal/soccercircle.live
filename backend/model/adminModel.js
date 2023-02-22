const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema

const adminSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true })

//////////// static signup method
adminSchema.statics.signup = async function (email, password) {

  if (!email) {
    throw Error("Please fill the email");
  }
  if (!password) {
    throw Error("Please fill the password");
  }

  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const admin = await this.create({ email, password: hash })

  return admin
}

/////// static login method

adminSchema.statics.login = async function (email, password) {
  console.log(password);
  if (!email) {
    throw Error("Please fill the email");
  }
  if (!password) {
    throw Error("Please fill the password");
  }


 let admin = await this.findOne({ email})
  console.log(admin,"adminLogin");

  if (!admin) {
    throw Error('Incorrect email')
  }
  if(admin.password != password){
    throw Error('Please fill the correct credentials')
  }
  return admin
  

}

module.exports = mongoose.model('Admin', adminSchema)