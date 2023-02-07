import dbConnect from "@/lib/dbConnect";
const Model = require("../../../Models/index");

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        let { Email, Password } = req.body;
        const existingUser = await Model.User.findOne({ Email });
        if (!existingUser) {
          return res
            .status(400)
            .json({ success: false, data: "Invalid Email or Password" });
        }
        res.status(200).json({ success: true, data: pets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
