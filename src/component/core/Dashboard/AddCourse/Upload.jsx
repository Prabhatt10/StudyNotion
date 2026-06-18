import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {

  const [selectedFile, setSelectedFile] = useState(null)

  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )

  // Handle file drop
  const onDrop = (acceptedFiles) => {

    const file = acceptedFiles[0]

    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  // Dropzone config
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({

    accept: !video
      ? {
          "image/*": [".jpeg", ".jpg", ".png"],
        }
      : {
          "video/*": [".mp4"],
        },

    multiple: false,

    onDrop,
  })

  // Preview selected file
  const previewFile = (file) => {

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  // Register input field
  useEffect(() => {

    register(name, {
      required: true,
    })

  }, [register, name])

  // Set selected file into react-hook-form
  useEffect(() => {

    setValue(name, selectedFile)

  }, [selectedFile, setValue, name])

  return (
    <div className="flex flex-col space-y-2">

      {/* Label */}
      <label
        className="text-sm text-richblack-5"
        htmlFor={name}
      >
        {label}

        {
          !viewData && (
            <sup className="text-pink-200">*</sup>
          )
        }
      </label>

      {/* Upload Area */}
      <div
        className={`${
          isDragActive
            ? "bg-richblack-600"
            : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >

        {
          previewSource ? (

            <div className="flex w-full flex-col p-6">

              {
                !video ? (

                  <img
                    src={previewSource}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                  />

                ) : (

                  <video
                    controls
                    className="h-full w-full rounded-md object-cover"
                  >
                    <source
                      src={previewSource}
                      type="video/mp4"
                    />

                    Your browser does not support the video tag.

                  </video>

                )
              }

              {
                !viewData && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewSource("")
                      setSelectedFile(null)
                      setValue(name, null)
                    }}
                    className="mt-3 text-richblack-400 underline"
                  >
                    Cancel
                  </button>
                )
              }

            </div>

          ) : (

            <div
              {...getRootProps()}
              className="flex w-full flex-col items-center p-6"
            >

              {/* Hidden Input */}
              <input {...getInputProps()} />

              {/* Upload Icon */}
              <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">

                <FiUploadCloud className="text-2xl text-yellow-50" />

              </div>

              {/* Upload Text */}
              <p className="mt-2 max-w-[250px] text-center text-sm text-richblack-200">

                Drag and drop an {!video ? "image" : "video"}, or click to{" "}

                <span className="font-semibold text-yellow-50">
                  Browse
                </span>{" "}

                a file

              </p>

              {/* Upload Guidelines */}
              <ul className="mt-10 flex list-disc flex-wrap justify-center gap-x-8 gap-y-2 text-center text-xs text-richblack-200">

                <li>Aspect ratio 16:9</li>

                <li>Recommended size 1024x576</li>

              </ul>

            </div>

          )
        }

      </div>

      {/* Validation Error */}
      {
        errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )
      }

    </div>
  )
}