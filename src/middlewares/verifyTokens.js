import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SALT } from "../utils/token";

export function checkAccessToken(req, res, next) {
  let token = req.headers["authorization"];

  if (token) {
    try {
      const payload = jwt.verify(token, ACCESS_TOKEN_SALT);
      console.log(payload);

      next();
    } catch (err) {
      res.status(401).json({ Error: "UNAUTHORIZED" });
    }
  } else {
    res.status(404).json({ Error: "ACCESS TOKEN NOT FOUND" });
  }
}
