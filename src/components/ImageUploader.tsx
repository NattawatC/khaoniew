import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface ImageUploaderProps {
  onUpload: (files: File[]) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [fileUploaded, setFileUploaded] = useState<boolean>(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!fileUploaded) {
        onUpload(acceptedFiles)
        setFileUploaded(true)
      }
    },
    [fileUploaded, onUpload]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const dropzoneStyle: React.CSSProperties = {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    display: fileUploaded ? "none" : "block", // Hide the dropzone if fileUploaded is true
  }

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      <p>โปรดอัปโหลดมื้ออาหารของคุณพร้อมภาชนะไว้ข้างอาหาร</p>
    </div>
  )
}

export default ImageUploader
