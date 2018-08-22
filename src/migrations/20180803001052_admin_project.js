/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable("project_admins", table => {
    table.increments();
    table
      .timestamp("created_at")
      .notNull()
      .defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").notNull();
    table
      .integer("admin_id")
      .references("admins.id")
      .onDelete("CASCADE");
    table
      .integer("project_id")
      .references("projects.id")
      .onDelete("CASCADE");
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable("project_admins");
}
