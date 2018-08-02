import bookshelf from '../db';
import ProjectInstance from './project_instance';

const TABLE_NAME = 'projects';

/* projects model*/

class projects extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
  get hasTimestamps() {
    return true;
  }
  hasProjectInstance() {
    return this.hasMany(ProjectInstance);
  }
}

export default projects;
