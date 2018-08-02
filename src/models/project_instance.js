import bookshelf from '../db';
import Project from './projects';
import Log from './logs';
const TABLE_NAME = 'project_instances';

/**
 * Admin Project_Instance.
 */
class ProjectInstance extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  hasLogs() {
    return this.hasMany(Log);
  }

  belongstoProject() {
    return this.belongsTo(Project);
  }
}

export default ProjectInstance;
