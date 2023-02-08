import dbConnect from "@/lib/dbConnect";
import User from "../../../Models/User";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        let { Name, Email, Password } = req.body;
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            data: "There is an account associated with this email.",
          });
        }
        const newUser = new User({
          Name,
          Email,
          Password,
        });
        await newUser.save();
        res.status(200).json({ success: true, data: newUser });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}