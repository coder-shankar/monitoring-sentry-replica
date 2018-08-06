import { Router } from 'express';
// import { area } from "Sentry-node-module";

// console.log(area(4, 4));

import adminController from './controllers/adminsController';
import projectInstanceController from './controllers/projectInstanceController';
import signUpController from './controllers/signUpController';
import authController from './controllers/authController';
import projectController from './controllers/projectController';

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

export default router;
