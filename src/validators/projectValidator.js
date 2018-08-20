import * as projectService from "../services/projectService";
/**
 * Validate admins existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findProject(req, res, next) {
  return projectService
    .getProject(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findProject };
