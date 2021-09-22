
exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.foreign('user_id').references('users.id')
    table.string('text')
    table.datetime('date')
    table.timestamp('time')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};
