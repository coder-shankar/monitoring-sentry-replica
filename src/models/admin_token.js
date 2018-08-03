import bookshelf from '../db';

const TABLE_NAME = 'admin_token';

/**
 * Admin model.
 */
class AdminToken extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default AdminToken;
