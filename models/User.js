import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  password:{
    type: String,
    required: [true, 'Password is required!'],
    select: false, // Exclude password from queries by default
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character!"]
  },
  
  image: {
    type: String,
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true, // This allows the field to be optional
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // This allows the field to be optional
  },
});

const User = models.User || model("User", UserSchema);

export default User;
