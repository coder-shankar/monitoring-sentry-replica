import { Router } from 'express';
import adminController from './controllers/adminsController';
import signUpController from './controllers/signUpController';
import authController from './controllers/authController';
import projectController from './controllers/projectController';
import projectInstanceController from './controllers/projectInstanceController';

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
