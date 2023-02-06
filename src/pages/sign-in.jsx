import { Formik } from "formik"

import Page from "@/web/components/Page"
import FormField from "@/web/components/FormField"
import Button from "@/web/components/Button"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import Form from "@/web/components/Form"
import useAppContext from "@/web/hooks/useAppContext"
import Alert from "@/web/components/Alert"

const initialValues = {
  email: "",
  password: "",
}

const SignInPage = () => {
  const [error, setError] = useState(null)
  const router = useRouter()
  const { signIn } = useAppContext()
  const handleSubmit = useCallback(
    async ({ email, password }) => {
      setError(null)

      const [error] = await signIn({ email, password })

      if (error) {
        setError(error)

        return
      }

      router.push("/dashboard")
    },
    [router, signIn]
  )

  return (
    <Page>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

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
          <Button type="submit">Sign In</Button>
        </Form>
      </Formik>
    </Page>
  )
}

export default SignInPage
