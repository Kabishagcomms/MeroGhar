'use client'
import { useForm, SubmitHandler } from 'react-hook-form'

import { loginSignupModal } from '../interface/buttons'
import { LoginRegisterInput } from '../interface/request'
import { ErrorText } from './random'
import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useModal from '../store/useModal'
import { toast } from 'react-hot-toast'
import Api from '../api/client/axios'
import Image from 'next/image'

//since this component will be used multiple places always check the page before rendering the component

export default function LoginSignup({
  login,
  modal,
}: loginSignupModal): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRegisterInput>()

  const loginSignupModal = useModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<LoginRegisterInput> = async (data) => {
    setIsLoading(true)
    console.log(data)
    const { userId, password, email } = data
    if (login) {
      try {
        // Changed to use credential which can be either userId or email
        const credential = userId
        const res = await Api.post(
          '/auth/v1/login',
          { credential, password },
          { withCredentials: true }
        )
        if (res.data.success) {
          console.log('login succesful')
          // if(res.data.user.is_Admin){}
          toast.success('Login Successful!')
          router.refresh()
          loginSignupModal.onClose()
          // Redirect to listings page after successful login
          return router.push('/Home/listings')
        }
        toast.error(res.data.error)
        setIsLoading(false)
        return router.push('/Home')
      } catch (e) {
        setIsLoading(false)
        toast.error('Login Failed/Invalid Credential/UserBanned')
        return router.push('/Home')
      }
    }

    //for signup
    try {
      const res = await Api.post(
        '/auth/v1/registerUser',
        { userId, password, email }, // Include email in the request
        { withCredentials: true }
      )
      if (res.data.success) {
        toast.success('User Registered Successfully!')
        setIsLoading(false)
        loginSignupModal.onClose()
        return ;
      }

      throw new Error(`${res.data.error}`)
    } catch (e: any) {
      setIsLoading(false)
      return toast.error(e.message)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center bg-mainColor px-6 py-12 md:w-[540px] lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src="https://res.cloudinary.com/dnimr7n8t/image/upload/v1742365333/buymesome_j4ja9q.png"
          width={90}
          height={90}
          className="mx-auto w-auto"
        />
        <h2 className="text-secondaryColor mt-10 text-center text-2xl font-bold tracking-tight">
          {login ? 'Sign In to Your Account' : 'Create an Account'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="userId"
              className="text-secondaryColor block text-sm font-medium"
            >
              {login ? 'User ID or Email' : 'User ID'}
            </label>
            <div className="mt-2">
              <input
                id="userId"
                type="text"
                placeholder={login ? "Enter your User ID or Email" : "Enter your User ID"}
                required
                className="text-secondaryColor placeholder:text-secondaryColor/50 block w-full rounded-md bg-mainColor px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-secondaryColor/30 focus:outline-2 focus:-outline-offset-2 focus:outline-secondaryColor sm:text-sm"
                {...register('userId', {
                  required: "User ID is required",
                  minLength: {
                    value: login ? 1 : 4, // Allow shorter input for login (could be email)
                    message: login ? "" : "User ID must be at least 4 characters"
                  }
                })}
              />
              {errors.userId && (
                <ErrorText text={errors.userId.message || "Please enter a valid User ID"} />
              )}
            </div>
          </div>

          {/* Email input field - same styling applied */}
          {!login && (
            <div>
              <label
                htmlFor="email"
                className="text-secondaryColor block text-sm font-medium"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
                  required
                  className="text-secondaryColor placeholder:text-secondaryColor/50 block w-full rounded-md bg-mainColor px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-secondaryColor/30 focus:outline-2 focus:-outline-offset-2 focus:outline-secondaryColor sm:text-sm"
                  {...register('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <ErrorText text={errors.email.message || "Please enter a valid email"} />
                )}
              </div>
            </div>
          )}

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="text-secondaryColor block text-sm font-medium"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                placeholder="Enter your Password"
                required
                className="text-secondaryColor placeholder:text-secondaryColor/50 block w-full rounded-md bg-mainColor px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-secondaryColor/30 focus:outline-2 focus:-outline-offset-2 focus:outline-secondaryColor sm:text-sm"
                {...register('password', {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />
              {errors.password && (
                <ErrorText text={errors.password.message || "Please enter a valid Password"} />
              )}
            </div>
          </div>

          {/* Forgot password link */}
          {login && (
            <div className="text-sm">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  loginSignupModal.onClose();
                  router.push('/Home/forgotpassword');
                }}
                className="font-semibold text-secondaryColor hover:text-secondaryHover"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-secondaryColor px-3 py-1.5 text-sm font-semibold text-mainColor shadow-sm hover:bg-secondaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondaryColor disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-mainColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {login ? 'Signing in...' : 'Signing up...'}
                </>
              ) : (
                login ? 'Sign in' : 'Sign up'
              )}
            </button>
          </div>
        </form>

        {/* Bottom text and links */}
        <p className="text-secondaryColor/70 mt-10 text-center text-sm">
          {login ? "Don't have an account?" : 'Already have an account?'}{' '}
          {modal ? (
            <button
              className="font-semibold text-secondaryColor hover:text-secondaryHover"
              onClick={(e) => {
                e.preventDefault()
                login
                  ? loginSignupModal.onOpen('signup')
                  : loginSignupModal.onOpen('login')
              }}
            >
              {login ? 'Sign up' : 'Sign in'}
            </button>
          ) : (
            <Link
              href={login ? '/signup' : '/login'}
              className="font-semibold text-secondaryColor hover:text-secondaryHover"
            >
              {login ? 'Sign up' : 'Sign in'}
            </Link>
          )}
        </p>
      </div>
    </div>
  )
}
