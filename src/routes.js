import { Router } from 'express';

import logsController from './controllers/logsController';
import authController from './controllers/authController';
import signUpController from './controllers/signUpController';
import projectController from './controllers/projectController';
import adminController from './controllers/adminsController';
import projectInstanceController from './controllers/projectInstanceController';

// // checking Sentry-wannabe
// import Sentry_Wannabe from "../../new-module/Sentry-node-module";
// const instanceKey = "b58794fb-35f3-42b0-88bd-8cc4833572e6";
// Sentry_Wannabe.configure(instanceKey);
// let error = {
//   type: "404  ok ok ok ",
//   message: "thisalid one "
// };
// Sentry_Wannabe.log(error);
/**
 * Contains all API routes for the application.
 */
let router = Router();

router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/admin', adminController);
router.use('/projectInstance', projectInstanceController);
router.use('/signUp', signUpController);
router.use('/auth', authController);
router.use('/project', projectController);
router.use('/logs', logsController);

export default router;
