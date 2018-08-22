import { Router } from "express";
import HttpStatus from "http-status-codes";
import * as projectInstanceService from "../services/projectInstanceService";

const router = Router();

/**
 * GET /api/project Instance
 */
router.get("/", (req, res, next) => {
  if (req.headers.instanceid === "undefined") {
    req.headers.instanceid = null;
  }
  const searchQuery = req.query.search || "";
  const rowsPerPage = parseInt(req.query.rowsPerPage);
  const page = parseInt(req.query.page);

  projectInstanceService
    .getRelatedProjectInstances(
      searchQuery,
      rowsPerPage,
      page,
      req.headers.projectid,
      req.headers.userid,
      req.headers.instanceid
    )
    .then(data => res.json({ data, pagination: data.pagination }))
    .catch(err => next(err));
});

/**
 * POST /api/projectInstance
 */
router.post("/", (req, res, next) => {
  projectInstanceService
    .createProjectInstance(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 *
 * DELETE /api/id
 */
router.delete("/:id", (req, res, next) => {
  projectInstanceService
    .deleteProjectInstance(req.params.id)
    .then(() => res.status(204).json({ Success: "Project Instance Deleted" }))
    .catch(err => next(err));
});

export default router;
