import bookshelf from "../db";

const TABLE_NAME = "project_admins";

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
