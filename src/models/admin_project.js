import bookshelf from '../db';

const TABLE_NAME = 'admin_project';

/**
 * Admin model.
 */
class AdminProject extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default AdminProject;
