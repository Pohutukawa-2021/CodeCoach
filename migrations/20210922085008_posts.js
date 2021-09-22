
exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.string('text')
    table.datetime('date')
    table.timestamp('time')
    table.string('auth_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};
