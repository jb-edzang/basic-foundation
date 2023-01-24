import config from "@/api/config"
import { randomBytes, pbkdf2Sync } from "crypto"

const hashPassword = (
  password,
  salt = randomBytes(config.security.password.saltLen).toString("hex")
) => [
  pbkdf2Sync(
    password,
    salt,
    config.security.password.iterations,
    config.security.password.keylen,
    config.security.password.digest
  ).toString("hex"),
  salt,
]

export default hashPassword
