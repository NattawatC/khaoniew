import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface ImageUploaderProps {
  onUpload: (files: File[]) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the uploaded files
      onUpload(acceptedFiles)
    },
    [onUpload]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const dropzoneStyle: React.CSSProperties = {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  }

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      <p>โปรดอัปโหลดมื้ออาหารของคุณพร้อมภาชนะไว้ข้างอาหาร</p>
    </div>
  )
}

export default ImageUploader
