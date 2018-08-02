import Boom from 'boom';
import Admin from '../models/admin';

/**
 * Get all admin.
 *
 * @return {Promise}
 */
export function getAllAdmins() {
  return Admin.fetchAll();
}

/**
 * Get a admin.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getAdmin(id) {
  return new Admin({ id }).fetch().then(admin => {
    if (!admin) {
      throw new Boom.notFound('User not found');
    }

    return admin;
  });
}

/**
 * Create new admin.
 *
 * @param  {Object}  admin
 * @return {Promise}
 */
export function createAdmin(admin) {
  return new Admin({ name: admin.name }).save();
}

/**
 * Update a admin.
 *
 * @param  {Number|String}  id
 * @param  {Object}         admin
 * @return {Promise}
 */
export function updateAdmin(id, admin) {
  return new Admin({ id }).save({ name: admin.name });
}

/**
 * Delete a admin.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteAdmin(id) {
  return new Admin({ id }).fetch().then(admin => admin.destroy());
}
