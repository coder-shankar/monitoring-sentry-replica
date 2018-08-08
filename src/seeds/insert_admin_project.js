/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('project_admins')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('project_admins').insert([
          {
            admin_id: 1,
            updated_at: new Date(),
            project_id: 1
          },
          {
            admin_id: 1,
            updated_at: new Date(),
            project_id: 2
          },
          {
            admin_id: 2,
            updated_at: new Date(),
            project_id: 1
          }
        ])
      ]);
    });
}
