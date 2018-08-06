import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as logsService from '../services/logsService';

const router = Router();

/**
 * GET /api/admins
 */
router.get('/', (req, res, next) => {
  logsService
    .getRelatedProject(req.headers)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

// router.get("/", (req, res, next) => {
//   projectService
//     .getAllProjects(req.headers)
//     .then(data => res.json({ data }))
//     .catch(err => next(err));
// });

/**
 * POST /api/admin
 */
router.post('/', (req, res, next) => {
  logsService
    .createNewProject(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

export default router;
