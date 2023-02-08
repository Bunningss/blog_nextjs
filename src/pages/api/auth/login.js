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
        if (!existingUser) {
          return res
            .status(400)
            .json({ success: false, data: "Invalid email or password." });
        } else {
          const verifiedPass = existingUser.Password === Password;
          if (!verifiedPass) {
            return res
              .status(400)
              .json({ success: false, data: "Invalid email or password" });
          } else {
            res.status(200).json({ success: true, data: existingUser });
          }
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          data: "An error occured. Please try again.",
        });
      }
      break;
    default:
      break;
  }
}
