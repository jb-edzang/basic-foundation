import "dotenv/config"
import knexfile from "@@/knexfile.js"

const config = {
  db: knexfile,
  security: {
    password: {
      saltLen: 128,
      iterations: 100000,
      keylen: 128,
      digest: "sha512",
    },
    jwt: {
      secret: process.env.SECURITY_JWT_SECRET,
      expiresIn: "7 days",
    },
  },
}

export default config
