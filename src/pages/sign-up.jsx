import { Formik } from "formik"

import Page from "@/web/components/Page"
import FormField from "@/web/components/FormField"
import Button from "@/web/components/Button"
import { useCallback } from "react"
import { useRouter } from "next/router"
import Form from "@/web/components/Form"
import useAppContext from "@/web/hooks/useAppContext"

const initialValues = {
  username: "",
  email: "",
  password: "",
}

const SignUpPage = () => {
  const router = useRouter()
  const { signUp } = useAppContext()
  const handleSubmit = useCallback(
    async ({ username, email, password }) => {
      await signUp({ username, email, password })

      router.push("/sign-in")
    },
    [router, signUp]
  )

  return (
    <Page>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <FormField
            name="username"
            placeholder="Enter your username"
            type="text"
          />
          <FormField
            name="email"
            placeholder="Enter your e-mail"
            type="email"
          />
          <FormField
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          <Button type="submit">Sign Up</Button>
        </Form>
      </Formik>
    </Page>
  )
}

export default SignUpPage
