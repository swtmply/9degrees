import Articles from "@/models/Articles";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
    const { method } = req;
    await mongoDBConnect();
  
  switch (method) {
    case "GET":
      try {
        const articles = await Articles.find({});

        console.log("/all", articles.length)
    
        if (articles) return res.status(200).json({ articles });
    } catch (error) {
        return res.status(400).json({ message: "Failed to fetch Articles" });
      }
    break; 

  }
}
