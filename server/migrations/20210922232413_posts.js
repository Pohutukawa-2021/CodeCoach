exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.integer("user_id");
    table.string("title");
    table.string("text");
    table.string("date");
    table.string("time");
    table.string("tags");
    table.integer("votes");
    table.boolean("answered")
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
