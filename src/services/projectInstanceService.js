import ProjectInstance from "../models/project_instances";
import * as keyGenerator from "../utils/uniqueKey";

/**
 * Get all ProjectInstances
 *
 * @return {Promise}
 */
export function getRelatedProjectInstances(projectID) {
  const projectId = projectID;

  return new ProjectInstance()
    .query(queryObj => {
      queryObj
        .select("*")
        .from("project_instances")
        .where({ project_id: projectId });
    })
    .fetchAll()
    .then(data => {
      return data;
    });
}

/**
 * Create new ProjectInstance
 *
 * @param  {Object}  admin
 * @return {Promise}
 */

// here project_id is passed as body parameter but it should be known without passing;from header
export function createProjectInstance(projectInstance) {
  const key = keyGenerator.createUniqueKey();

  const projectId = projectInstance.projectID;

  return new ProjectInstance({
    instance_name: projectInstance.instanceName,
    instance_key: key,
    project_id: projectId
  }).save();
}

/**
 * Delete project Instance.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteProjectInstance(id) {
  return new ProjectInstance({ id }).fetch().then(p => p.destroy());
}
