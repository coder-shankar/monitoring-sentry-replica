import { Router } from "express";
import HttpStatus from "http-status-codes";
import * as projectService from "../services/projectService";
import { findProject } from "../validators/projectValidator";

const router = Router();

/**
 * GET /api/related projects
 */
router.get("/", (req, res, next) => {
  projectService
    .getRelatedProject(req.headers.email)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/related projects with id
 */
router.get("/:id", (req, res, next) => {
  // console.log("user id", req.header);
  projectService
    .getProject(req.params.id)
    .then(data => {
      console.log("data project name", data);
      res.json({ data });
    })
    .catch(err => next(err));
});

/**
 * POST /api/projects
 */
router.post("/", (req, res, next) => {
  projectService
    .createNewProject(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**  
 * 
 * DELETE /api/id
 */
router.delete("/:id", findProject, (req, res, next) => {
  projectService
    .deleteProject(req.params.id)
    .then(() => res.status(204).json({ Success: "Project Deleted" }))
    .catch(err => next(err));
});

export default router;
