import Articles from "@/models/Articles";
import mongoDBConnect from "@/lib/mongoDBConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  await mongoDBConnect();
  const session = await getSession({ req });
  // for dashboard
  switch (method) {
    case "GET":
      try {
        if (session.user.role == "Editor-in-Chief") {
          const articles = await Articles.find({});
          console.log(articles.length);
          console.log("Writer", session.user);
          return res.status(200).json({ articles });
        }
        if (session.user.role == "Head") {
          const articles = await Articles.find({
            category: session.user.categories,
          });
          console.log(articles.length);
          console.log("Writer", session.user);
          return res.status(200).json({ articles });
        }
        if (session.user.role == "Writer") {
          const articles = await Articles.find({ 
            writer: session.user.name 
          });
          console.log(articles.length);
          console.log("Writer", session.user);
          return res.status(200).json({ articles });
        }
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Failed to fetch articles" });
      }
      break;
  }
}
