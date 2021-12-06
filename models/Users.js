import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,

    categories: [String],

    socials: {
      type: Object,
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
