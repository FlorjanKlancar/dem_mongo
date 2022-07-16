import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  id: {type: Number},
  displayName: {
    type: String,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
    trim: true,
  },
  emailVerified: {
    type: Boolean,
  },
  heroIcon: {
    type: String,
    trim: true,
  },
  authType: {
    type: String,
    trim: true,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = (await bcrypt.hash(this.password as any, salt)) as any;
});

/* UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
}; */

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose?.models?.User || mongoose.model("User", UserSchema);
