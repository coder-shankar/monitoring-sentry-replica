import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as projectService from '../services/projectService';
import { findProject } from '../validators/projectValidator';

const router = Router();

/**
 * GET /api/admins
 */
router.get('/', (req, res, next) => {
  projectService
    .getRelatedProject(req.headers.email)
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
  projectService
    .createNewProject(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

router.delete('/:id', findProject, (req, res, next) => {
  console.log('req body header --------------', req.params);
  projectService
    .deleteProject(req.params.id)
    .then(() => res.status(204).json({ Success: 'Project Deleted' }))
    .catch(err => next(err));
});

export default router;
