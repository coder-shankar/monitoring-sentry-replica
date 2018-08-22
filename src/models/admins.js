import bookshelf from "../db";

const TABLE_NAME = "admins";

/**
 * Admin model.
 */
class Admin extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default Admin;
