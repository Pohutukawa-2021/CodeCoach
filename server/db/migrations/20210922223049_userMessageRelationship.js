
exports.up = function(knex) {
  return knex.schema.createTable('user_message_relationship', (table) => {
    table.increments('id').primary()
    table.foreign('message_id').ref('messages.id')
    table.foreign('to').ref('users.id')
    table.foreign('from').ref('users.id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_message_relationship')
};
