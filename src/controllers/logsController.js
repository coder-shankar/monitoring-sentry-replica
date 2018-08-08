import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as logsService from '../services/logsServices';

const router = Router();

/**
 * GET /api/logs
 */
router.get('/', (req, res, next) => {
  logsService
    .getRelatedLogs(req.headers)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  logsService
    .createNewLog(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

export default router;
