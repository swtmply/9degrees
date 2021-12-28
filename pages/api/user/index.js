import Users from "@/models/Users";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
  const { method } = req;
  mongoDBConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await Users.find({});
    
        if (users) return res.status(200).json({ users: users.reverse() });
      } catch (error) {
        return res.status(400).json({ message: "Users failed to fetch" });
      }
      break;
    case 'PUT':
      try {
        const user = await Users.findByIdAndUpdate(
          req.query.id,
          {
            ...req.body,
          },
          { new: true }
        );

        if (user)
          return res.status(200).json({ message: "Update Success", user});
      } catch (error) {
        return res.status(400).json({ message: "Failed to update user" });
      }
  }
}
