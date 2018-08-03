import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as adminService from '../services/adminService';
// import { findAdmin, adminValidator } from "../validators/adminValidator";

const router = Router();

/**
 * POST /api/signUp
 */

// create new admin
router.post('/', (req, res, next) => {
  adminService
    .createAdmin(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

export default router;
