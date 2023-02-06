export const up = async (knex) => {
  await knex.schema.alterTable("posts", (table) => {
    table.timestamp("publishedAt").nullable().alter()
    table.dropColumns("createdAt", "updatedAt")
  })
  await knex.schema.alterTable("posts", (table) => {
    table.timestamps(true, true, true)
  })
}

export const down = async (knex) => {
  await knex.schema.alterTable("posts", (table) => {
    table.timestamp("createdAt").notNullable()
    table.timestamp("publishedAt").notNullable().alter()
    table.timestamp("updatedAt").notNullable()
  })
}
