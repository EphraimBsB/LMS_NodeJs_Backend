/* eslint-disable consistent-return */
import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secrete");
    req.userData = decodedToken;
    next();
  } catch (e) {
    return res.status(401).json({
      status: 401,
      message: "Sorry, Invalid or Expired Token",
      error: e,
    });
  }
};

export const checkRole = (permission) => {
  return (req, res, next) => {
    const { userData } = req;
    const { role } = userData;
    if (permission.includes(role)) {
      next();
    } else {
      res.status(401).json("Sorry, You don't have permission");
    }
  };
};
