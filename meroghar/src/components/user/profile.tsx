'use client'

import { FiUserCheck, FiUserMinus } from 'react-icons/fi'
import { HiStar, HiMinus } from 'react-icons/hi'

import { HiCheck } from 'react-icons/hi'
import { EditBasic } from './editProfile'

import Image from 'next/image'
import Card from '../card/card'
import { FetchedMe, Property } from '../../interface/response'
import { bg } from '../../styles/variants'
import useAccount from '../../store/AccountState'
import AccountComponent from './account'
import Password from './pasword'
interface ProfileProps {
  userId: string
  profileData: Partial<FetchedMe>
  listings?:Partial<Property>[],
  is_Admin: boolean
}

export default function Profile({
  userId,
  profileData,
  listings,
  is_Admin,
}: ProfileProps) {
  const {
    profileImg,
    kycInfo,
    email,
    kyc,
    about,
    recievedReviewcount,
    avgRating,
    createdAt,
    userName,
    password,
  } = profileData

  const account = useAccount()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Profile Header - updated background color */}
        <div className="bg-white px-6 py-8">
          <div className="flex flex-wrap-reverse items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Hi, I am {userName}</h2>
              <p className="mt-2 text-sm text-gray-600">
                Joined in {new Date(createdAt!).getFullYear()}
              </p>
            </div>
            <div className="relative">
              <Image
                height={150}
                width={150}
                src={profileImg!.imgUrl || '/user.png'}
                alt={userName || 'User'}
                className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-xl object-cover"
                style={{ maxHeight: '160px', maxWidth: '160px' }}
              />
            </div>
          </div>
        </div>

        {/* Stats Section - updated icon colors */}
        <div className="px-6 py-6 border-b border-[#EAE7DD]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              {kyc!.isVerified ? (
                <FiUserCheck className="h-6 w-6 text-[#99775C]" />
              ) : (
                <FiUserMinus className="h-6 w-6 text-gray-400" />
              )}
              <div>
                <span className="block text-sm text-gray-500">Identity Status</span>
                <span className="font-medium">{kyc!.isVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <HiStar className="h-6 w-6 text-[#99775C]" />
              <div>
                <span className="block text-sm text-gray-500">Reviews</span>
                <span className="font-medium">{recievedReviewcount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <HiStar className="h-6 w-6 text-[#99775C]" />
              <div>
                <span className="block text-sm text-gray-500">Average Rating</span>
                <span className="font-medium">{avgRating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status - updated colors */}
        <div className="px-6 py-6 border-b border-[#EAE7DD]">
          <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-[#EAE7DD]/30 rounded-lg">
              {kyc!.isVerified ? (
                <HiCheck className="h-5 w-5 text-[#99775C]" />
              ) : (
                <HiMinus className="h-5 w-5 text-gray-400" />
              )}
              <span className="text-sm font-medium">Identity</span>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              {email!.isVerified ? (
                <HiCheck className="h-5 w-5 text-[#99775C]" />
              ) : (
                <HiMinus className="h-5 w-5 text-gray-400" />
              )}
              <span className="text-sm font-medium">Email</span>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              {kycInfo!.phoneNumber ? (
                <HiCheck className="h-5 w-5 text-[#99775C]" />
              ) : (
                <HiMinus className="h-5 w-5 text-gray-400" />
              )}
              <span className="text-sm font-medium">Phone</span>
            </div>
          </div>
        </div>

        {/* Profile Actions - updated button colors */}
        <div className="px-6 py-4 border-b border-[#EAE7DD]">
          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.preventDefault()
                account.onOpen('profile')
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all
                ${account.openComponent == 'profile'
                  ? 'bg-[#99775C] text-white'
                  : 'text-gray-700 hover:bg-[#EAE7DD]'
                }`}
            >
              Edit Profile
            </button>

            <button
              onClick={(e) => {
                e.preventDefault()
                account.onOpen('account')
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all
                ${account.openComponent == 'account'
                  ? 'bg-[#99775C] text-white'
                  : 'text-gray-700 hover:bg-[#EAE7DD]'
                }`}
            >
              Account Settings
            </button>

            {password && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  account.onOpen('password')
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all
                  ${account.openComponent == 'password'
                    ? 'bg-[#99775C] text-white'
                    : 'text-gray-700 hover:bg-[#EAE7DD]'
                  }`}
              >
                Password
              </button>
            )}
          </div>
        </div>

        {/* About Section - updated background */}
        <div className="px-6 py-6 border-b border-[#EAE7DD]">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <p className="text-gray-600 bg-[#EAE7DD]/30 rounded-lg p-4">
            {about || 'I am so excited to explore the properties!'}
          </p>
        </div>
        {account.openComponent == 'close' && (
          <div className="px-6 py-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-600 bg-gray-50 rounded-lg p-4">
              {about || 'I am so excited to explore the properties!'}
            </p>
          </div>
        )}

        {/* Listings Section */}
        {account.openComponent == 'close' && (
          <div className="px-6 py-6">
            <h3 className="text-lg font-semibold mb-6">
              {profileData.userName} Listings
            </h3>
            {listings && listings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((data, index) => (
                  <Card data={data} key={index} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No listings yet</p>
            )}
          </div>
        )}
      </div>

      {/* Additional Components */}
      {account.openComponent == 'profile' && (
        <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden">
          <EditBasic
            img={profileImg!.imgUrl}
            userName={userName!}
            about={about!}
          />
        </div>
      )}

      {/* Admin Section */}
      {is_Admin && userId !== profileData._id && account.openComponent == 'close' && (
        <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden">
          <AccountComponent
            userData={profileData}
            is_Admin={true}
            userId={userId}
          />
        </div>
      )}

      {account.openComponent == 'account' && (
        <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden">
          <AccountComponent
            userData={profileData}
            is_Admin={is_Admin}
            userId={userId}
          />
        </div>
      )}

      {account.openComponent == 'password' && (
        <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden">
          <Password />
        </div>
      )}
    </main>
  );
}
