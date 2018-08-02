/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('project_instances')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('project_instances').insert([
          {
            instance_name: 'Dev',
            instance_key: 'a2d34d',
            updated_at: new Date(),
            project_id: 1
          },
          {
            instance_name: 'QA',
            instance_key: 'a2d3asddass4d',
            updated_at: new Date(),
            project_id: 1
          },
          {
            instance_name: 'Dev',
            instance_key: 'asfaadasdd34d',
            updated_at: new Date(),
            project_id: 2
          },
          {
            instance_name: 'QA',
            instance_key: 'asdasdd34d',
            updated_at: new Date(),
            project_id: 2
          }
        ])
      ]);
    });
}
