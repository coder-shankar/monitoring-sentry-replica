import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SALT } from "../utils/token";

export function checkAccessToken(req, res, next) {
  let token = req.headers["authorization"];

  if (token) {
    const payload = jwt.verify(token, ACCESS_TOKEN_SALT);
    if (!payload) {
      res.status(401).json({ Error: "UNAUTHORIZED" });
    } else {
      next();
    }
  } else {
    res.status(404).json({ Error: "ACCESS TOKEN NOT FOUND" });
  }
}
