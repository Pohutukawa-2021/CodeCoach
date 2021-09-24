exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.string('title')
    table.string('text')
    table.string('date')
    table.string('time')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};