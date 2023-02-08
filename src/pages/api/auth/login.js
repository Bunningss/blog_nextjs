import dbConnect from "@/lib/dbConnect";
import User from "../../../Models/User";
import Jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        let { Email, Password } = req.body;
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
          if (existingUser.Password === Password) {
            const token = Jwt.sign(
              {
                id: existingUser._id,
              },
              process.env.JWT_SEC
            );
            const { Password, ...others } = existingUser._doc;
            return res.status(400).json({
              success: false,
              data: { others, token },
            });
          }
        }
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
