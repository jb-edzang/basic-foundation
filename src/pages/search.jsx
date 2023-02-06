import Page from "@/web/components/Page"
import { useRouter } from "next/router"

const SearchPage = () => {
  const {
    query: { q: search },
  } = useRouter()

  return (
    <Page>
      Hello,{" "}
      {search ? (
        <>
          you're looking for <span className="italic">{search}</span>.
        </>
      ) : (
        "please enter a search term."
      )}
    </Page>
  )
}

export default SearchPage
