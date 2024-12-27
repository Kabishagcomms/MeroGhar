'use client'


import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { ImSpinner4 } from 'react-icons/im'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { ErrorText } from '../random'
import 'react-phone-input-2/lib/style.css'
import { auth } from '../../configs/firebase'
import OtpInput from 'react-otp-input'
import { checkPhone,postPhone } from '../../api/client/user'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface phone {
    phoneNumber: string
    setphonemail: React.Dispatch<React.SetStateAction<string>>;
}
  

 export  function PhoneComp({phoneNumber,setphonemail}:phone) {
    const [otp, setOtp] = useState('')
    const [ph, setPh] = useState(phoneNumber)
    const [error, seterror] = useState('')
    const [loading, setLoading] = useState(false)
    const [showOTP, setShowOTP] = useState(false)
    const router=useRouter()
  
    function onCaptchVerify() {
      try {
        console.log('this on captha verifiy is called')
  
        window.recaptchaVerifier = new RecaptchaVerifier(
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response: any) => {
              onSignup()
            },
            'expired-callback': () => {},
          },
          auth
        )
      } catch (e) {
        seterror('phone')
      }
    }
  
    async function onSignup() {
      setLoading(true)
  
      // check whether this phone number is already used
      const phone = await checkPhone(ph) //phone number passed
      if (!phone) {
        seterror('reuse')
        setLoading(false)
        return console.log('Phone Number Reuse Detected')
      }
  
      onCaptchVerify()
  
      const appVerifier = window.recaptchaVerifier
  
      const formatPh = '+' + ph
      console.log(formatPh)
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult : any) => {
          window.confirmationResult = confirmationResult
          setLoading(false)
          setShowOTP(true)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
          seterror('phone')
        })
    }
  
    async function onOTPVerify() {
      console.log('verify otp')
      console.log(otp)
      setLoading(true)
      window.confirmationResult
        .confirm(otp)
        .then(async (res: any) => {
          console.log(res)
  
          //post phone number to database
          const post = await postPhone(ph)
          if (!post) {
            setLoading(false)
            seterror('fail')
            return toast.error("Failed to Post Phone Number");
          }
          setLoading(false)
          setShowOTP(false)
          toast.success("Phone Number verified and Posted!")
          return router.refresh();

        })
        .catch((err: any) => {
          console.log(err)
          setLoading(false)
          seterror('otp')
          return toast.error("Failed to verify Otp Try Again!!!");
        })
    }
  
    return (
      <main>
        {/* for phone number verification */}
        <div className="my-3 ">
          {!showOTP && (
            <div>
              <label className=" mb-2 text-md block font-semibold text-slate-700">
                Phone Number
              </label>
  
              <div className=" flex flex-col items-start  sm:flex-row sm:items-center">
                <div className="w-full">
                  <PhoneInput country={'us'} value={ph} onChange={setPh} />
                  <div className="my-2">
                    {error == 'phone' && (
                      <ErrorText text="Please Enter Valid PhoneNumber/Formatted PhoneNumber" />
                    )}
                    {error == 'reuse' && (
                      <ErrorText text="Phone Number Already used by user" />
                    )}
                  </div>
                </div>
                <div id="recaptcha-container"></div>
                <button
                  onClick={onSignup}
                  className="text-sm font-semibold text-gray-700 underline"
                >
                  SendCode
                </button>
              </div>

              <button className='text-sm font-semibold underline mt-2' onClick={(e)=>setphonemail('close')}>Cancel</button>
            </div>
          )}
  
          {loading && (
            <div className="flex items-center justify-center">
              <ImSpinner4 className="h-5 w-5 animate-spin fill-themeColor stroke-themeColor" />
            </div>
          )}
  
          {showOTP && (
            <div>
              <h1 className=" my-2 text-lg font-semibold text-gray-700">
                Enter Your OTP
              </h1>
              <OtpInput
                value={otp}
                shouldAutoFocus={true}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                containerStyle={'p-2 flex justify-center gap-x-3'}
                inputStyle={'border-b border-gray-700 w-5'}
              />
  
              {error == 'otp' && (
                <p className="my-3 text-center text-sm text-red-500">
                  Please Enter Valid Otp Code
                </p>
              )}
  
              {error == 'fail' && (
                <p className="my-3 text-center text-sm text-red-500">
                  Phone Post Failed
                </p>
              )}
  
              <hr className="my-5 border-gray-400" />
  
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowOTP(false)
                  }}
                  className="text-md font-semibold text-gray-700 underline"
                >
                  Cancel
                </button>
                <button
                  onClick={onOTPVerify}
                  className="rounded-lg border font-semibold border-white bg-themeColor p-2 px-4 text-white transition-all hover:bg-mainColor"
                >
                  Verify Code
                </button>
              </div>

              
            </div>
          )}

         
        </div>
      </main>
    )
  }
  