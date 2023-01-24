import "dotenv/config"
import { resolve } from "path"

const knexfile = {
  client: "pg",
  connection: {
    host: process.env.DD_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    stub: resolve("src/api/db/migration.stub"),
    directory: resolve("src/api/db/migrations"),
  },
}

export default knexfile
