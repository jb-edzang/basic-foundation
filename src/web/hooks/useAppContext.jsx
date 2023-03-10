import deepmerge from "deepmerge"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import api from "@/web/services/api"
import getApiError from "@/web/utils/getApiError"

const LOCALSTORAGE_JWT_KEY = "session_jwt"

const initialState = {}
const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [state, setState] = useState(initialState)
  const update = useCallback(
    (newState) =>
      setState((oldState) =>
        deepmerge(
          oldState,
          typeof newState === "function" ? newState(oldState) : newState
        )
      ),
    []
  )
  const updateSession = useCallback(
    (jwt) => {
      if (!jwt) {
        update({
          session: null,
        })

        return
      }

      const session = JSON.parse(atob(jwt.split(".")[1])).payload

      update({ session })
    },
    [update]
  )
  const signUp = useCallback(async ({ username, email, password }) => {
    try {
      const {
        data: { result },
      } = await api.post("/sign-up", { username, email, password })

      return [null, result]
    } catch (err) {
      return [getApiError(err), null]
    }
  }, [])
  const signIn = useCallback(
    async ({ username, email, password }) => {
      try {
        const {
          data: { result: jwt },
        } = await api.post("/sign-in", { username, email, password })

        localStorage.setItem(LOCALSTORAGE_JWT_KEY, jwt)
        updateSession(jwt)

        return [null, jwt]
      } catch (err) {
        return [getApiError(err), null]
      }
    },
    [updateSession]
  )
  const signOut = useCallback(() => {
    localStorage.removeItem(LOCALSTORAGE_JWT_KEY)
    updateSession(null)
  }, [updateSession])
  const createPost = async ({ title, content }) => {
    try {
      const {
        data: { result: jwt },
      } = await api.post("/posts", { title, content })

      localStorage.setItem(LOCALSTORAGE_JWT_KEY, jwt)
      updateSession(jwt)

      return [null, jwt]
    } catch (err) {
      return [getApiError(err), null]
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem(LOCALSTORAGE_JWT_KEY)

    updateSession(jwt)
  }, [updateSession])

  if (!("session" in state)) {
    return (
      <div className="fixed inset-0 flex animate-bounce items-center justify-center text-4xl">
        Loading...
      </div>
    )
  }

  return (
    <AppContext.Provider
      {...props}
      value={{
        state,
        signUp,
        signIn,
        signOut,
        createContext,
      }}
    />
  )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
