import React from 'react'
import ChangeProfileImage from './ChangeProfileImage'
import ChangeProfileInformation from './ChangeProfileInformation'
import ChangePassword from './ChangePassword'
import DeleteButton from './DeleteButton'

function Settings() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 space-y-12">

      <h1 className="text-3xl font-medium text-[#F1F2FF] text-center md:text-left">
        Edit Profile
      </h1>

      <ChangeProfileImage />

      <ChangeProfileInformation />

      <ChangePassword />

      <DeleteButton />

    </div>
  )
}

export default Settings
