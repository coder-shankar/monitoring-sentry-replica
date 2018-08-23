import { Router } from "express";

import * as authService from "../services/authService";

const router = Router();

/**
 * GET /api/auth
 */
router.post("/login", (req, res, next) => {
  authService
    .login(req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.post("/refresh", (req, res, next) => {
  const refreshToken = req.get("refreshToken");
  authService
    .refresh(refreshToken)
    .then(data => res.json(data))
    .catch(err => next(err));
});

export default router;
