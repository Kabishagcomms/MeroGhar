import { checkSession } from '../../../api/server/auth'
import LoginSignup from '../../../components/loginSignup'
import { redirect } from 'next/navigation'

export default async function Login() {
  const session = await checkSession()

  if (!session.session)
    return (
      <main className="w-full">
        {/* main container with full width */}
        <div className="my-24 flex items-center justify-center">
          {/* modal/content container  */}
          <div className="w-[95%] sm:w-[80%] md:w-fit">
            <LoginSignup login={true} modal={false} />
          </div>
        </div>
      </main>
    )

  //else redirect to home
  return redirect('/Home')
}