import bookshelf from "../db";
import ProjectInstance from "./project_instances";

const TABLE_NAME = "projects";

/* projects model*/

class Project extends bookshelf.Model {
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

export default Project;
