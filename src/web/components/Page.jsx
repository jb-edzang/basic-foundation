import Link from "@/web/components/Link"
import useAppContext from "@/web/hooks/useAppContext"
import clsx from "clsx"
import { useRouter } from "next/router"

const NavLink = (props) => {
  const { asPath } = useRouter()
  const { href } = props

  return <Link {...props} className={clsx({ underline: asPath === href })} />
}

const Page = (props) => {
  const { children, className, noPadding = false } = props
  const {
    state: { session },
  } = useAppContext()

  return (
    <div className={clsx("flex min-h-screen flex-col", className)}>
      <header className="flex items-center justify-between bg-slate-100 p-4">
        <h1 className="text-4xl font-bold">LOGO</h1>
        <nav>
          {session && `Welcome #${session.user.id}`}
          <ul>
            {session ? (
              <>
                <li>
                  <NavLink href="/dashboard">Dashboard</NavLink>
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
