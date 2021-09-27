exports.up = function (knex) {
  return knex.schema.createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("message");
    table.datetime("date").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("messages");
};
