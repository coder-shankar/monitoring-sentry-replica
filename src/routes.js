import { Router } from 'express';

import logsController from './controllers/logsController';
import authController from './controllers/authController';
import signUpController from './controllers/signUpController';
import projectController from './controllers/projectController';
import adminController from './controllers/adminsController';
import projectInstanceController from './controllers/projectInstanceController';

// // checking Sentry-wannabe
// import Sentry_Wannabe from "../../sentry-node-module";
// //for user try and project try of instance dev
// const instanceKey = "e0d34d00-54c2-4202-a3fd-ca333a80a68a";
// Sentry_Wannabe.configure(instanceKey);
// let error = {
//   type: "try 2 error ",
//   message: "2nd try",
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
