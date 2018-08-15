import { Router } from "express";

import logsController from "./controllers/logsController";
import authController from "./controllers/authController";
import signUpController from "./controllers/signUpController";
import projectController from "./controllers/projectController";
import adminController from "./controllers/adminsController";
import projectInstanceController from "./controllers/projectInstanceController";
import * as verifyToken from "./middlewares/verifyTokens";
// // // checking Sentry-wannabe
// import Sentry_Wannabe from "../../sentry-node-module";
// // for user try and project try of instance dev
// const instanceKey = "446d9983-6d24-404d-862e-010838629af3";
// Sentry_Wannabe.configure(instanceKey);
// let error = {
//   type: "ok 1st try ",
//   message: "1st"
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
