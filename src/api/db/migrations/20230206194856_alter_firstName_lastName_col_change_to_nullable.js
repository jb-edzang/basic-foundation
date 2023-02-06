export const up = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.text("firstName").nullable().alter()
    table.text("lastName").nullable().alter()
  })
}

export const down = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.text("firstName").notNullable().alter()
    table.text("lastName").notNullable().alter()
  })
}
