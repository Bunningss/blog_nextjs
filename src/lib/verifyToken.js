import jwt from "jsonwebtoken";

const verifyToken = (req, res) => {
  const token = req.headers.cookie?.split("=")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, data: "You are not authorized" });
      } else {
        req.user = user;
      }
    });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.Id === req.params.id || req.user.Role === "Admin") {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "You are not authorized to perform this action." });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.Role === "Admin") {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "You are not authorized to perform this action." });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
