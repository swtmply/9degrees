import Users from "@/models/Users";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const data = req.body;
  mongoDBConnect();
  
  switch (method) {
  case 'GET':
    try {
      const user = await Users.findById(id);
  
      if (user) return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: "Failed to fetch user" });
    }
    break;
  case 'PUT':
    console.log('bwisit na yan')
    try {
      const newArticle = await Articles.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      if (newArticle)
        return res.status(201).json({ message: "Article has been updated" });
    } catch (error) {
      return res.status(400).json({ message: "Couldn't update article" });
    }
    break;
  }
}
