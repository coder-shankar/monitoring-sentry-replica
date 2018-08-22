import { Router } from "express";

import logsController from "./controllers/logsController";
import authController from "./controllers/authController";
import signUpController from "./controllers/signUpController";
import projectController from "./controllers/projectController";
import adminController from "./controllers/adminsController";
import projectInstanceController from "./controllers/projectInstanceController";
import * as verifyToken from "./middlewares/verifyTokens";
// // checking Sentry-wannabe
// import Sentry_Wannabe from "../../node-modules";
// // for user try and project try of instance dev
// const instanceKey = "2c4f86a1-0a66-4a49-bda4-f0826a3162bf";
// Sentry_Wannabe.configure(instanceKey);
// let error = {
//   type: "QA",
//   message: "Error on error "
// };
// Sentry_Wannabe.log(error);

/**
 * Contains all API routes for the application.
 */
let router = Router();

router.get("/", (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use("/signUp", signUpController);
router.use("/auth", authController);
router.use("/admin", adminController);
router.use("/projectInstance", verifyToken.checkAccessToken, projectInstanceController);
router.use("/project", verifyToken.checkAccessToken, projectController);
router.use("/logs", logsController);
export default router;
