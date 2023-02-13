import dbConnect from "@/lib/dbConnect";
import Articles from "@/Models/Article";
import { verifyToken } from "@/lib/verifyToken";
import User from "@/Models/User";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const articles = await Articles.find();
        res.status(200).json({ success: true, data: articles });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    case "POST":
      verifyToken(req, res);
      try {
        let { Title, Image, Category, Article } = req.body;
        const newArticle = new Articles({
          Title,
          Image,
          Category,
          Article,
          Author: req.user.ID,
        });
        await User.findByIdAndUpdate(
          req.user.id,
          {
            $push: {
              Articles: newArticle._id,
            },
          },
          { new: true }
        );
        await newArticle.save();
        res.status(200).json({ success: true, data: newArticle });
      } catch (error) {
        res.status(400).json({ success: false, data: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
