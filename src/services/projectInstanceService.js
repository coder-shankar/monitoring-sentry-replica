import ProjectInstance from '../models/project_instances';

/**
 * Get all ProjectInstances
 *
 * @return {Promise}
 */
export function getAllProjectInstances() {
  return ProjectInstance.fetchAll();
}

/**
 * Create new ProjectInstance
 *
 * @param  {Object}  admin
 * @return {Promise}
 */

// here project_id is passed as body parameter but it should be known without passing;from header
export function createProjectInstance(projectInstance) {
  return new ProjectInstance({
    instance_name: projectInstance.name,
    instance_key: projectInstance.key,
    project_id: projectInstance.id
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
