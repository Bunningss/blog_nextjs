import dbConnect from "@/lib/dbConnect";
import User from "../../../Models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto-js";

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
          const decryptedPass = crypto.AES.decrypt(
            existingUser.Password,
            process.env.CRYPTO_SEC
          ).toString(crypto.enc.Utf8);
          const verifiedPass = decryptedPass === Password;
          if (!verifiedPass) {
            return res
              .status(400)
              .json({ success: false, data: "Invalid email or password" });
          } else {
            const authToken = jwt.sign(
              {
                Name: existingUser.Name,
                Email: existingUser.Email,
                ID: existingUser._id,
                IsAuthor: existingUser.IsAuthor,
              },
              process.env.JWT_SEC
            );
            const { Password, ...others } = existingUser._doc;
            res
              .status(200)
              .json({ success: true, data: { others, authToken } });
          }
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          data: error.message,
        });
      }
      break;
    default:
      break;
  }
}
