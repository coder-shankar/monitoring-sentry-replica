/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('projects')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('projects').insert([
          {
            project_name: 'Sentry',
            admin_id: 1,
            updated_at: new Date()
          },
          {
            project_name: 'MaxPanel',
            admin_id: 2,
            updated_at: new Date()
          }
        ])
      ]);
    });
}
