export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.text("username").unique().notNullable()
    table.text("email").unique().notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
  })
  await knex.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.integer("userId").notNullable().references("id").inTable("users")
    table.timestamp("createdAt").notNullable()
    table.timestamp("publishedAt").notNullable()
    table.timestamp("updatedAt").notNullable()
  })
  await knex.schema.createTable("comments", (table) => {
    table.increments("id")
    table.text("content").notNullable()
    table.integer("userId").notNullable().references("id").inTable("users")
    table.integer("postId").notNullable().references("id").inTable("posts")
    table.timestamp("createdAt").notNullable()
    table.timestamp("updatedAt").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("comments")
  await knex.schema.dropTable("posts")
  await knex.schema.dropTable("users")
}
