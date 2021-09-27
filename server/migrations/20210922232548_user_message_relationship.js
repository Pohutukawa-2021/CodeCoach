exports.up = function (knex) {
  return knex.schema.createTable("user_message_relationship", (table) => {
    table.increments("id").primary();
    table.foreign("message_id").references("messages.id");
    table.foreign("to").references("users.id");
    table.foreign("from").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_message_relationship");
};
