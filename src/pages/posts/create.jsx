import Page from "@/web/components/Page"
import useAppContext from "@/web/hooks/useAppContext"

const CreatePostPage = () => {
  const { createPost } = useAppContext()
  const handleSubmit = async ({ title, content }) => {
    createPost({ title, content })
  }

  return <Page>...FORMIK...</Page>
}

export default CreatePostPage
