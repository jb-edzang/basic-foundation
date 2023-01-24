import config from "@/api/config"
import BaseModel from "@/api/db/models/BaseModel"
import knex from "knex"

const mw = (handlersByMethod) => async (req, res) => {
  const { method } = req
  const handlers = handlersByMethod[method]

  if (!handlers || !handlers.length) {
    res.statusCode(404).send({ error: `Cannot ${method} ${req.url}` })

    return
  }

  BaseModel.knex(knex(config.db))

  const callbacks = Array.isArray(handlers) ? handlers : [handlers]
  let currentCallbackIndex = 0
  const next = async () => {
    const callback = callbacks[currentCallbackIndex]
    currentCallbackIndex += 1

    await callback(req, res, next)
  }

  await next()
}

export default mw
