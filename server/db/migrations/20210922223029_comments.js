
exports.up = function(knex) {
  return knex.schema.createTable('comment', (table) => {
    table.increments('id').primary()
    table.foreign('post_id').ref('posts.id')
    table.foreign('user_id').ref('user_message_relationship.id')
    table.string('text')
    table.datetime('date')
    table.timestamp('time')
  })
  
};

exports.down = function(knex) {
  return knex.table.schema.dropTable('comment')
};
