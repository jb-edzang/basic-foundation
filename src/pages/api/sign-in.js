import config from "@/api/config"
import jsonwebtoken from "jsonwebtoken"
import UserModel from "@/api/db/models/UserModel"
import hashPassword from "@/api/hashPassword"
import mw from "@/api/mw"

const handler = mw({
  POST: async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.query()
      .findOne({ email })
      .orWhere({ username: email })

    if (!user) {
      res.status(401).send({ error: "Invalid credentials" })

      return
    }

    const [passwordHash] = hashPassword(password, user.passwordSalt)

    if (passwordHash !== user.passwordHash) {
      res.status(401).send({ error: "Invalid credentials" })

      return
    }

    const jwt = jsonwebtoken.sign(
      {
        payload: {
          user: {
            id: user.id,
          },
        },
      },
      config.security.jwt.secret,
      { expiresIn: config.security.jwt.expiresIn }
    )

    res.send({ result: jwt })
  },
})

export default handler
