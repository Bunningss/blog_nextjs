import dbConnect from "@/lib/dbConnect";
import User from "../../../Models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto-js";
import cookie from "cookie";

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
            // Set cookie
            res.setHeader(
              "Set-Cookie",
              cookie.serialize("token", authToken, {
                httpOnly: true,
                // #TODO: Set Secure True
                secure: false,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "strict",
                path: "/",
              })
            );
            const { Password, ...others } = existingUser._doc;
            res.status(200).json({ success: true, data: others });
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
