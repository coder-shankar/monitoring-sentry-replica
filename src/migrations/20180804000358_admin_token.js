/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable("admin_tokens", table => {
    table.increments();
    table
      .timestamp("created_at")
      .notNull()
      .defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").notNull();
    table
      .integer("admin_id")
      .references("admins.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.varchar("refresh_token").notNull();
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable("admin_tokens");
}
