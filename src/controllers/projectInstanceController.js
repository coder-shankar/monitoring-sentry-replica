import { Router } from "express";
import HttpStatus from "http-status-codes";
import * as projectInstanceService from "../services/projectInstanceService";

const router = Router();

/**
 * GET /api/project Instance
 */
router.get("/", (req, res, next) => {
  // projectname always comes in non camelcase
  projectInstanceService
    .getRelatedProjectInstances(req.headers.projectid, req.headers.userid)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/projectInstance
 */
router.post("/", (req, res, next) => {
  console.log("headersa", req.body);
  projectInstanceService
    .createProjectInstance(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

export default router;
