// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import IconButton from '../../../common/IconButton'
// import { FiUpload } from 'react-icons/fi'
// import { updateDisplayPicture } from '../../../../services/operations/SettingAPI'

// function ChangeProfileImage() {

//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)

//   const dispatch = useDispatch()

//   const [loading, setLoading] = useState(false)
//   const [imageFile, setImageFile] = useState(null)
//   const [previewImage, setPreviewImage] = useState(null)

//   const fileInputReference = useRef(null)

//   function handleClick() {
//     fileInputReference.current.click()
//   }

//   function handleFileChange(e) {
//     const file = e.target.files[0]
//     if (file) {
//       setImageFile(file)
//       generatePreviewImage(file)
//     }
//   }

//   // FIXED FUNCTION NAME
//   function generatePreviewImage(file) {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewImage(reader.result)
//     }
//   }

//   function handleFileUpload() {
//     if (!imageFile) return

//     try {
//       setLoading(true)
//       const formData = new FormData()
//       formData.append("displayPicture", imageFile)
//       console.log("Token iin frontend : " , token);

//       // FIXED ACTION
//       dispatch(updateDisplayPicture(token, formData))
//         .then(() => setLoading(false))

//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (imageFile) {
//       generatePreviewImage(imageFile)
//     }
//   }, [imageFile])

//   return (
//     <div className='flex items-center justify-between bg-[#161D29] border-[#2C333F] rounded-md p-8 px-12 text-[#F1F2FF]'>
//       <div className='flex items-center gap-x-4'>

//         <img
//           src={previewImage || user?.image}
//           alt={`profile-${user?.firstName}`}
//           className='aspect-square w-[78px] rounded-full object-cover'
//         />

//         <div className='space-y-2'>
//           <p>Change Profile Picture</p>

//           <div className='flex flex-row gap-3'>

//             <input
//               type='file'
//               ref={fileInputReference}
//               onChange={handleFileChange}
//               className='hidden'
//               accept='image/png, image/jpeg, image/gif'
//             />

//             <button
//               onClick={handleClick}
//               disabled={loading}
//               className='cursor-pointer rounded-md py-2 px-5 font-semibold text-[#C5C7D4] bg-[#2C333F]'
//             >
//               Select
//             </button>

//             <IconButton
//               text={loading ? "Uploading" : "Upload"}
//               onClick={handleFileUpload}
//             >
//               {!loading && <FiUpload size={20} color='#F1F2FF' />}
//             </IconButton>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ChangeProfileImage




import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
import { FiUpload } from 'react-icons/fi'
import { updateDisplayPicture } from '../../../../services/operations/SettingAPI'

function ChangeProfileImage() {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const fileInputReference = useRef(null)

  const handleClick = () => fileInputReference.current.click()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      generatePreviewImage(file)
    }
  }

  const generatePreviewImage = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => setPreviewImage(reader.result)
  }

  const handleFileUpload = () => {
    if (!imageFile) return

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)

      dispatch(updateDisplayPicture(token, formData))
        .then(() => setLoading(false))

    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (imageFile) generatePreviewImage(imageFile)
  }, [imageFile])

  return (
    <div className="w-[93%] ml-[30px] bg-[#161D29] border border-[#2C333F] rounded-md p-6 md:p-10 flex flex-col md:flex-row items-center md:justify-between gap-6 text-[#F1F2FF]">

      {/* IMAGE + TEXT BLOCK */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">

        {/* Profile image */}
        <img
          src={previewImage || user?.image}
          alt={`profile-${user?.firstName}`}
          className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover"
        />

        {/* Text + Buttons */}
        <div className="space-y-3 text-center sm:text-left">
          <p className="font-medium">Change Profile Picture</p>

          {/* Button Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">

            <input
              type="file"
              ref={fileInputReference}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />

            <button
              onClick={handleClick}
              disabled={loading}
              className="rounded-md py-2 px-5 font-semibold text-[#C5C7D4] bg-[#2C333F] 
                         text-sm sm:text-base"
            >
              Select
            </button>

            <IconButton
              text={loading ? "Uploading" : "Upload"}
              onClick={handleFileUpload}
            >
              {!loading && <FiUpload size={18} color="#F1F2FF" />}
            </IconButton>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfileImage
