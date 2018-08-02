/**
 * @param  {object} knex
 * @return {Promise}
 */

export function up(knex) {
  return knex.schema.createTable('admins', table => {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('email').notNull();
    table.string('password').notNull();
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('admins');
}
