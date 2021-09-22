exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.string('text')
    table.datetime('date')
    table.timestamp('time')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};