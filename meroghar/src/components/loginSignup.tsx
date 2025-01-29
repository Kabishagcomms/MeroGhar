'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SocialLogin } from './buttons'
import { inputStyle } from '../styles/variants'
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

  const onSubmit: SubmitHandler<LoginRegisterInput> = async (data) => {
    console.log(data)
    const { userId, password } = data
    if (login) {
      try {
        const res = await Api.post(
          '/auth/v1/login',
          { userId, password },
          { withCredentials: true }
        )
        if (res.data.success) {
          console.log('login succesful')
          // if(res.data.user.is_Admin){}
          toast.success('Login Successful!')
          router.refresh()
          return loginSignupModal.onClose()
        }
        toast.error(res.data.error)
        return router.push('/Home')
      } catch (e) {
        toast.error('Login Failed/Invalid Credential/UserBanned')
        return router.push('/Home')
      }
    }

    //for signup
    try {
      const res = await Api.post(
        '/auth/v1/registerUser',
        { userId, password },
        { withCredentials: true }
      )
      if (res.data.success) {
        toast.success('User Registeres Successfully!')
        return loginSignupModal.onOpen('login')
      }

      throw new Error(`${res.data.error}`)
    } catch (e: any) {
      return toast.error(e.message)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center bg-white px-6 py-12 md:w-[540px] lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src="https://res.cloudinary.com/dnimr7n8t/image/upload/v1737989511/mero-removebg-preview_xr1hum.png"
          width={90}
          height={90}
          className="mx-auto  w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {login ? 'Sign In to Your Account' : 'Create an Account'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-900"
            >
              User ID
            </label>
            <div className="mt-2">
              <input
                id="userId"
                type="text"
                placeholder="Enter your User ID"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                {...register('userId', { required: true, minLength: 4 })}
              />
              {errors.userId && (
                <ErrorText text="Please enter a valid User ID" />
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                placeholder="Enter your Password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                {...register('password', { required: true, minLength: 4 })}
              />
              {errors.password && (
                <ErrorText text="Please enter a valid Password" />
              )}
            </div>
          </div>

          {login && (
            <div className="text-sm">
              <Link
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {login ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {login ? "Don't have an account?" : 'Already have an account?'}{' '}
          {modal ? (
            <button
              className="font-semibold text-indigo-600 hover:text-indigo-500"
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
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {login ? 'Sign up' : 'Sign in'}
            </Link>
          )}
        </p>
      </div>
    </div>
  )
}
