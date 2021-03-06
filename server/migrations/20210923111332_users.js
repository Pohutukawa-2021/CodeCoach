exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('email')
      table.string('username')
      table.string('role')
      table.string('auth_id')
      table.string('image_url')
      table.string('bio')
      table.string('experience')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};