import ProjectInstance from '../models/project_instances';
import Project from '../models/projects';
import * as keyGenerator from '../utils/uniqueKey';

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
export async function createProjectInstance(projectInstance) {
  const key = keyGenerator.createUniqueKey();

  const projectId = await Project.forge({
    project_name: projectInstance.project_name
  })
    .fetch()
    .then(data => {
      const pId = data.get('id');

      return pId;
    });

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
