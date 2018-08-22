import ProjectInstance from "../models/project_instances";
import * as keyGenerator from "../utils/uniqueKey";

/**
 * Get all ProjectInstances
 *
 * @return {Promise}
 */
export function getRelatedProjectInstances(projectId, userId, instanceId) {
  return new ProjectInstance()
    .query(queryObj => {
      queryObj
        .select("*")
        .from("project_admins")
        .innerJoin("projects", { "project_admins.project_id": "projects.id" })
        .innerJoin("project_instances", { "project_instances.project_id": "projects.id" });
      if (projectId === "all") {
        queryObj.where({ "project_admins.admin_id": userId });
      } else if (instanceId) {
        queryObj.where({
          "project_admins.project_id": projectId,
          "project_admins.admin_id": userId,
          "project_instances.id": instanceId
        });
      } else {
        queryObj.where({ "project_admins.project_id": projectId, "project_admins.admin_id": userId });
      }
    })
    .fetchAll()
    .then(data => {
      return data;
    });
}

// export function getRelatedSpecificProjectInstances(projectId, userId, instanceId) {
//   return new ProjectInstance()
//     .query(queryObj => {
//       queryObj
//         .select("*")
//         .from("project_admins")
//         .innerJoin("projects", { "project_admins.project_id": "projects.id" })
//         .innerJoin("project_instances", { "project_instances.project_id": "projects.id" })
//         .where({
//           "project_admins.project_id": projectId,
//           "project_admins.admin_id": userId,
//           "project_instances.id": instanceId
//         });
//     })
//     .fetch()
//     .then(data => {
//       return data;
//     });
// }

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
