/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('admin_tokens')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('admin_tokens').insert([
          {
            updated_at: new Date(),
            admin_id: 1,
            refresh_token: 'xxxx'
          },
          {
            updated_at: new Date(),
            admin_id: 2,
            refresh_token: 'aaaa'
          }
        ])
      ]);
    });
}
