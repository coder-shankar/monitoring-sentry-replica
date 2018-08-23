/**

 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */

export function seed(knex, Promise) {
  // Deletes all existing entries

  return knex("admins")
    .del()
    .then(() => {
      // Inserts seed entries

      return Promise.all([
        knex("admins").insert([
          {
            email: "Devsanjay@gmail.com",
            updated_at: new Date(),
            password: "xxx"
          },

          {
            email: "dev2@gmail.com",
            updated_at: new Date(),
            password: "abc"
          }
        ])
      ]);
    });
}
