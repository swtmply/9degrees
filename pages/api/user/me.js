import Users from "@/models/Users";
import mongoDBConnect from "@/lib/mongoDBConnect";
import { getSession } from "next-auth/react";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  mongoDBConnect();

  switch (method) {
    case "GET":
      try {
        const session = await getSession({ req });
        const user = await Users.findById(session.id);

        if (user) return res.status(200).json({ user });
      } catch (error) {
        return res.status(400).json({ message: "Failed to fetch user" });
      }
    case "PUT":
      const { name, email, password, bio, image, socials } = req.body;
      try {
        const session = await getSession({ req });
        
        const user = await Users.findById(session.id)
        if (user) {
          user.name = name || user.name;
          user.email = email || user.email;
          user.bio = bio || user.bio;
          user.image = image || user.image;
          user.socials = socials || user.socials;
          if (password) 
            user.password = bcrypt.hashSync(password, 12);
        }
        const updatedUser = await user.save();
        return res.status(200).json({ message: "Update Success", updatedUser });
      } catch (error) {
        return res.status(400).json({ message: "Failed to fetch user" });
      }
  }
}
