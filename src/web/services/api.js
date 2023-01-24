import config from "@/web/config"
import axios from "axios"

const api = axios.create({
  baseURL: config.api.baseURL,
})

export default api
