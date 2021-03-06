const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Iltimos username ni kiriting!"],
        minlength: [5, "iltimos foydalanuvchi nomi 5ta belgidan ko'p bo'lishi kerak"],
    },
    email:{
        type: String,
        required: [true, "Iltimos email ni kiriting!"],
        unique: true,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Iltimos email ni to'g'ri kiriting!",]
    },
    password: {
        type: String,
        required: [true, "Iltimos parol yoziladigan qatorni to'ldiring!"],
        minlength: 8,
        select: false
    },
    zipCode: {
        type: String,
        required: [true, "Iltimos Zip Code ni to'ldiring!"],
        minlength: 6
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    updateAt: {
        type: Date,
        default: new Date(),
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

UserSchema.methods.getResetPasswordToken = function () {
   const resetToken = crypto.randomBytes(20).toString("hex")
   
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
   
   this.resetPasswordExpire = Date.now() + 10*60*1000
   
   return resetToken
}

const User = mongoose.model("User", UserSchema)

module.exports = User