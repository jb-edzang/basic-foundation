import hashPassword from "@/api/hashPassword"
import mw from "@/api/mw"
import UserModel from "@/api/db/models/UserModel"

const handler = mw({
  POST: async (req, res) => {
    const { username, email, password } = req.body
    const user = await UserModel.query().findOne({ username, email })

    if (user) {
      res.send({ result: true })

      return
    }

    const [passwordHash, passwordSalt] = hashPassword(password)

    await UserModel.query().insert({
      username,
      email,
      passwordHash,
      passwordSalt,
    })

    res.send({ result: true })
  },
})

export default handler
