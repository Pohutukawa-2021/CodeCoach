exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();
    table.integer("post_id");
    table.integer("user_id");
    table.string("comment");
    table.string("comment_date");
    table.string("comment_time");
  });
};

exports.down = function (knex) {
  return knex.table.schema.dropTable("comments");
};
