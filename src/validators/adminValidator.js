import Joi from "joi";
import validate from "../utils/validate";
import * as adminService from "../services/adminService";

const SCHEMA = {
  name: Joi.string()
    .label("Name")
    .max(90)
    .required()
};

/**
 * Validate create/update admins request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function adminValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate admins existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findAdmin(req, res, next) {
  return adminService
    .getAdmin(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findAdmin, adminValidator };
