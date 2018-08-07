import ProjectInstance from '../models/project_instances';
import Logs from '../models/logs';
// import Projects from '../models/projects';

/**
 * Get all Logs
 *
 * @return {Promise}
 */
export function getAllLogs() {
  return Logs.fetchAll();
}

// export async function getRelatedLogs(headers) {
//   const projectName = headers.projectname;

//   // const projectId = await Projects.forge({
//   //   project_name: projectName
//   // })
//   //   .fetch()
//   //   .then(data => {
//   //     return data.get("id");
//   //   });

//   return Logs.fetchAll();
// }

// const adminId = await Admin.forge({
//   email: email
// })
//   .fetch()
//   .then(data => {
//     const pId = data.get("id");

//     return pId;
//   });

// const projects = await new AdminProject()
//   .query(function(qb) {
//     qb
//       .where({
//         admin_id: adminId
//       })
//       .select("project_id");
//   })
//   .fetchAll()
//   .then(data => {
//     const result = data.toJSON();

//     return result;
//   });

// const projectId = [];

// projects.forEach(element => {
//   projectId.push(element.project_id);
// });

// return new Project()
//   .query(function(qb) {
//     qb.whereIn("id", [...projectId]);
//   })
//   .fetchAll();
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
      const pId = data.get('id');

      return pId;
    });

  return new Logs({
    type: data.error.type,
    message: data.error.message,
    project_instance_id: projectInstanceId
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
