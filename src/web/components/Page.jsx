import FormField from "@/web/components/FormField"
import Link from "@/web/components/Link"
import useAppContext from "@/web/hooks/useAppContext"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"

const NavLink = (props) => {
  const { asPath } = useRouter()
  const { href } = props

  return <Link {...props} className={clsx({ underline: asPath === href })} />
}

const Page = (props) => {
  const { children, className, noPadding = false } = props
  const {
    state: { session },
    signOut,
  } = useAppContext()
  const router = useRouter()
  const handleSearch = useCallback(
    ({ search }) => {
      router.push(`/search?${new URLSearchParams({ q: search }).toString()}`)
    },
    [router]
  )
  const handleLogout = useCallback(() => {
    signOut()

    router.push("/")
  }, [router, signOut])

  return (
    <div className={clsx("flex min-h-screen flex-col", className)}>
      <header className="flex items-center justify-between bg-slate-100 p-4">
        <h1 className="text-4xl font-bold">LOGO</h1>
        <nav className="flex items-center gap-4">
          <Formik
            onSubmit={handleSearch}
            initialValues={{ search: router.query.q || "" }}
          >
            <Form className="flex items-center">
              <FormField name="search" placeholder="Enter search terms..." />
              <button type="submit">
                <MagnifyingGlassIcon className="-ml-8 h-6 w-6" />
              </button>
            </Form>
          </Formik>
          {session && `Welcome #${session.user.id}`}
          <ul>
            {session ? (
              <>
                <li>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink href="/sign-up">Sign Up</NavLink>
                </li>
                <li>
                  <NavLink href="/sign-in">Sign In</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main
        className={clsx(
          "mx-auto w-full grow md:max-w-3xl md:border-l md:border-r",
          { "p-4": !noPadding }
        )}
      >
        {children}
      </main>
    </div>
  )
}

export default Page
