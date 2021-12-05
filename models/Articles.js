import { Schema, models, model } from "mongoose";

const articleSchema = new Schema(
  {
    title: String,
    body: String,
    image: {
      type: String,
      // don't mind this muna xD
      default: "/placeholder.jpg",
    },

    writer: String,
    category: String,

    status: {
      type: String,
      default: "draft",
    },
  },
  { timestamps: true }
);

export default models.Article || model("Article", articleSchema);
