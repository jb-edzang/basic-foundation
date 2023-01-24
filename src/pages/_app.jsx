import { AppContextProvider } from "@/web/hooks/useAppContext"
import "@/web/styles/globals.css"

const App = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default App
