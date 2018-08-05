import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as projectService from '../services/projectService';

const router = Router();

/**
 * GET /api/admins
 */
router.get('/', (req, res, next) => {
  projectService
    .getRelatedProject(req.headers)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/admin
 */
router.post('/', (req, res, next) => {
  projectService
    .createNewProject(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

export default router;
