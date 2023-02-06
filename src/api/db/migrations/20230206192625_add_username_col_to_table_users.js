// EXAMPLE OF ALTER
export const up = async () => {
  // await knex.schema.alterTable("users", (table) => {
  //   table.text("username").unique()
  // })
  // await knex("users").update({
  //   username: knex.raw("left(email, 4)"),
  // })
  // await knex.schema.alterTable("users", (table) => {
  //   table.text("username").notNullable().alter()
  // })
}

export const down = async () => {
  // await knex.schema.alterTable("users", (table) => {
  //   table.dropColumn("username")
  // })
}
