import Project from "../models/projects";
import AdminProject from "../models/admin_project";
import Admin from "../models/admins";
import Boom from "boom";

export function getAllProjects() {
  return Project.fetchAll();
}

export async function getRelatedProject(emailId) {
  const email = emailId;
  const adminId = await Admin.forge({
    email: email
  })
    .fetch()
    .then(data => {
      const pId = data.get("id");

      return pId;
    });

  const projects = await new AdminProject()
    .query(function(qb) {
      qb.where({
        admin_id: adminId
      }).select("project_id");
    })
    .fetchAll()
    .then(data => {
      const result = data.toJSON();

      return result;
    });

  const projectId = [];
  projects.forEach(element => {
    projectId.push(element.project_id);
  });

  return new Project()
    .query(function(qb) {
      qb.whereIn("id", [...projectId]);
    })
    .fetchAll();
}

export async function createNewProject(project) {
  const projectTable = await new Project({
    project_name: project.project_name
  }).save();

  const projectId = await Project.forge({
    project_name: project.project_name
  })
    .fetch()
    .then(data => {
      const pId = data.get("id");

      return pId;
    });

  const adminId = await Admin.forge({
    email: project.admin_email
  })
    .fetch()
    .then(data => {
      const pId = data.get("id");

      return pId;
    });

  const adminProjectTable = await new AdminProject({
    admin_id: adminId,
    project_id: projectId
  }).save();

  const res = {
    projectTable: projectTable,
    adminProjectTable: adminProjectTable
  };

  return res;
}

/**
 * Delete a project.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteProject(id) {
  console.log("id", id);

  return new Project({ id }).fetch().then(project => project.destroy());
}

/**
 * Get a project.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getProject(id) {
  return new Project({ id }).fetch().then(project => {
    if (project === null) {
      throw new Boom.notFound("Project not found");
    }

    return project;
  });
}
