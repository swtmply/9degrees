import Articles from "@/models/Articles";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
  const { method } = req;

  await mongoDBConnect();
  const data = req.body;

  switch (method) {
    case "POST":
      try {
        const newArticle = await Articles.create(data);

        if (newArticle)
          return res.status(201).json({ message: "Article has been created" });
      } catch (error) {
        return res.status(400).json({ message: "Couldn't create article" });
      }
      break;

    case "GET":
      try {
        const articles = await Articles.find({});

        if (articles) res.status(200).json({ articles });
      } catch (error) {
        return res.status(400).json({ message: "Articles failed to fetch" });
      }
      break;
  }
}
