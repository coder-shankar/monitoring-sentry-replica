/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex("projects")
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex("projects").insert([
          {
            project_name: "Sentry",

            updated_at: new Date()
          },
          {
            project_name: "Mob-dev",

            updated_at: new Date()
          }
        ])
      ]);
    });
}
