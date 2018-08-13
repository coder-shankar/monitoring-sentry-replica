import ProjectInstance from "../models/project_instances";
import Logs from "../models/logs";
import Projects from "../models/projects";

/**
 * Get all Logs
 *
 * @return {Promise}
 */
export function getAllLogs() {
  return Logs.fetchAll();
}

export async function getRelatedLogs(headers) {
  const projectName = headers.projectname;
  const projectId = await Projects.forge({
    project_name: projectName
  })
    .fetch()
    .then(data => {
      return data.get("id");
    });

  // trying to join
  return new ProjectInstance()
    .query(queryObj => {
      queryObj
        .select("*")
        .from("project_instances")
        .leftJoin("logs", { "logs.project_instance_id": "project_instances.id" })
        .where({ "project_instances.project_id": projectId });
    })
    .fetchAll()
    .then(data => {
      return data;
    });
  // //
}

/**
 * Create new Log
 *
 * @param  {Object}  log
 * @return {Promise}
 */

export async function createNewLog(data) {
  const projectInstanceId = await ProjectInstance.forge({
    instance_key: data.unique_key
  })
    .fetch()
    .then(data => {
      const pId = data.get("id");

      return pId;
    });

  return new Logs({
    type: data.error.type,
    message: data.error.message,
    project_instance_id: projectInstanceId
  }).save();
}
