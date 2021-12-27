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
    case "GET":
      try {
        const user = await Users.findById(id);

        if (user) return res.status(200).json({ user });
      } catch (error) {
        return res.status(400).json({ message: "Failed to fetch user" });
      }
      break;
    case "PUT":
      try {
        const newUser = await Users.findByIdAndUpdate(
          id,
          { ...data },
          {
            new: true,
            runValidators: true,
          }
        );

        if (newUser)
          return res.status(201).json({ message: "User has been updated" });
      } catch (error) {
        return res.status(400).json({ message: "Couldn't update user" });
      }
      break;
  }
}
