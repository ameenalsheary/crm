import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      minlength: [3, "First name must be at least 3 characters."],
      maxlength: [16, "First name cannot exceed 16 characters."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters."],
      maxlength: [16, "Last name cannot exceed 16 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists."],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
