
exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id')
  table.string('name', 40).notNullable()
  table.string('last_name', 40).notNullable()
  table.integer('age').notNullable()
  table.timestamp('birthday').notNullable()
  table.timestamp('created_at').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('users')
