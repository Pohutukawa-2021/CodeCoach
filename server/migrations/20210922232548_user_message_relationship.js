exports.up = function(knex) {
  return knex.schema.createTable('user_message_relationship', (table) => {
    table.increments('id').primary()
    table.integer('message_id')
    table.integer('to')
    table.integer('from')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_message_relationship')
};