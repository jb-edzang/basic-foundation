import PostModel from "@/api/db/models/PostModel"
import auth from "@/api/middlewares/auth"

const { default: mw } = require("@/api/mw")

const handler = mw({
  POST: [
    auth,
    async (req, res) => {
      const { title, content } = req.body
      const userId = req.session.user.id
      const post = await PostModel.query().insert({
        title,
        content,
        userId,
      })

      res.send({ result: post, meta: { count: 1 } })
    },
  ],
  GET: [
    async (req, res) => {
      const { limit = 10, page = 1, search } = req.query
      const query = PostModel.query()

      if (search) {
        query.whereLike("title", `%${search}%`)
        query.orWhereLike("content", `%${search}%`)
      }

      const result = await query
        .clone()
        .limit(limit)
        .offset((page - 1) * limit)
      const [{ count }] = await query.clone().count()

      res.send({
        result,
        meta: {
          count,
        },
      })
    },
  ],
})

export default handler
