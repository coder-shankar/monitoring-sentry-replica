import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as adminService from '../services/adminService';
import { findAdmin, adminValidator } from '../validators/adminValidator';

const router = Router();

/**
 * GET /api/admins
 */
router.get('/', (req, res, next) => {
  adminService
    .getAllAdmins()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/admins/:id
 */
router.get('/:id', (req, res, next) => {
  adminService
    .getAdmin(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/admin
 */
router.post('/', adminValidator, (req, res, next) => {
  adminService
    .createAdmin(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/admin/:id
 */
router.put('/:id', findAdmin, adminValidator, (req, res, next) => {
  adminService
    .updateAdmin(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/admin/:id
 */
router.delete('/:id', findAdmin, (req, res, next) => {
  adminService
    .deleteAdmin(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
