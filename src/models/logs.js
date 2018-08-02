import bookshelf from '../db';
import ProjectInstance from './project_instances';
const TABLE_NAME = 'logs';

/**
 * logs model
 */
class Logs extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  belongstoProjectInstance() {
    return this.belongsTo(ProjectInstance);
  }
}

export default Logs;
