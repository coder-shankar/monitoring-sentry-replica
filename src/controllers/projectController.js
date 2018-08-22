import { Router } from "express";
import HttpStatus from "http-status-codes";
import * as projectService from "../services/projectService";
import { findProject } from "../validators/projectValidator";

const router = Router();

/**
 * GET /api/related projects
 */
router.get("/", (req, res, next) => {
  const searchQuery = req.query.search || "";
  const rowsPerPage = parseInt(req.query.rowsPerPage);
  const page = parseInt(req.query.page);
  console.log("searchQuery" + req.query.search);

  projectService
    .getRelatedProject(searchQuery, rowsPerPage, page, req.headers.email)
    .then(data => {
      return res.json({ data, pagination: data.pagination });
    })
    .catch(err => next(err));
});

/**
 * GET /api/related projects with id
 */
router.get("/:id", (req, res, next) => {
  projectService
    .getProject(req.params.id, req.headers.userid)
    .then(data => {
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
