import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import React, { useState } from "react"
import { FaFistRaised } from "react-icons/fa"

interface FoodCardProps {
  date: string
  patientId: string
  mealId: number
  meal: string
  foodName: string
  score: string
  review: string
  reviewBy: string
  imageId: number
  updateReviewCallback: () => void
}

const ReviewCard: React.FunctionComponent<FoodCardProps> = ({
  date,
  patientId,
  mealId,
  meal,
  foodName,
  score,
  review,
  reviewBy,
  imageId,
  updateReviewCallback,
}) => {
  const [reviewText, setReviewText] = useState("")
  const [gumpunText, setGumpunText] = useState(score)
  const [imageDataUrl, setImageDataUrl] = useState<Blob | null>(null)
  const staffName =
    typeof window !== "undefined" ? localStorage.getItem("staffName") : null
  const formattedDate = new Date(date).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     try {
  //       const imageData = await fetchImageById(imageId)
  //       const imageUrl = URL.createObjectURL(imageData)
  //       console.log("imageId:", imageId)
  //       console.log("Image URL:", imageUrl) // Log image URL
  //       setImageDataUrl(imageUrl)
  //     } catch (error) {
  //       console.error("Error fetching image:", error)
  //     }
  //   }

  //   if (imageId) {
  //     fetchImage()
  //   }
  // }, [imageId])

  async function fetchImageById(id: any): Promise<any> {
    try {
      const response = await fetch(`http://localhost:4263/images/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch image")
      }
      const imageData = await response.blob()
      console.log("fetch by id's imageData", imageData)
      return imageData
    } catch (error) {
      console.error("Error fetching image:", error)
      throw error
    }
  }

  // async function doSome() {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:4263/patients/${patientId}/meals`
  //     )
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch food data")
  //     }
  //     const mealData = await response.json()
  //     let foundId = null
  //     for (const key in mealData) {
  //       if (Object.prototype.hasOwnProperty.call(mealData, key)) {
  //         const item = mealData[key]
  //         if (item.hasOwnProperty("id")) {
  //           foundId = item.id
  //           break // Once we find the id, no need to continue searching
  //         }
  //       }
  //     }
  //     if (foundId !== null) {
  //       console.log("Found id:", foundId)

  //       // Now fetch the image by id
  //       const imageData = await fetchImageById(foundId)
  //       // const imageUrl = URL.createObjectURL(imageData)
  //       setImageDataUrl(imageData)
  //       console.log("imageData:", imageData)
  //       console.log("ImageDataURL:", imageDataUrl)

  //       // Now you can use imageUrl to display the image
  //     } else {
  //       console.log("No id found in mealData")
  //     }
  //   } catch (error) {
  //     console.error("Error fetching meals data:", error)
  //   }
  // }

  async function doSome() {
    try {
      const response = await fetch(
        `http://localhost:4263/patients/${patientId}/meals`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch food data")
      }
      const mealData = await response.json()
      let foundId = null
      for (const key in mealData) {
        if (Object.prototype.hasOwnProperty.call(mealData, key)) {
          const item = mealData[key]
          if (item.hasOwnProperty("id")) {
            foundId = item.id
            break // Once we find the id, no need to continue searching
          }
        }
      }
      if (foundId !== null) {
        console.log("Found id:", foundId)

        // Now fetch the image by id
        const imageData = await fetchImageById(foundId)
        const imageUrl = URL.createObjectURL(imageData)
        setImageDataUrl(imageData)
        console.log("Blob URL:", imageUrl)

        const img = new Image()
        img.src = imageUrl
        img.onload = () => {
          document.body.appendChild(img)
        }

        console.log("img:", img)

        // Now you can use imageUrl to display the image
      } else {
        console.log("No id found in mealData")
      }
    } catch (error) {
      console.error("Error fetching meals data:", error)
    }
  }

  function submitReview() {
    const updateData = {
      review: reviewText,
      score: gumpunText,
      reviewBy: staffName,
    }

    fetch(
      `http://localhost:4263/patients/${patientId}/meals/${mealId}/feedbacks`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update review")
        }
        console.log("Review updated successfully")
        updateReviewCallback()
      })
      .catch((error) => {
        console.error("Error updating review:", error)
      })

    console.log(updateData)
  }

  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-5 text-text">
      <div className="flex flex-row gap-3"></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-bold">
            บันทึกประจำวันที่ :{" "}
            <span className="font-normal">{formattedDate}</span>
          </p>
          <p className="font-bold">
            มื้ออาหาร : <span className="font-normal">{meal}</span>
          </p>
          <p className="font-bold">
            ชื่ออาหาร : <span className="font-normal">{foodName}</span>
          </p>
          <div className="flex flex-row items-center gap-2">
            <p className="font-bold">
              คาร์โบไฮเดรต : <span className="font-normal">{score}</span>
            </p>
            <FaFistRaised size={20} />
          </div>
        </div>
        <div className="h-auto">
          <hr className="bg-text opacity-30 rounded h-1" />
        </div>

        <div className="flex flex-col">
          <p className="font-bold">ความคิดเห็นจากผู้เชี่ยวชาญ :</p>
          {review && review.trim() !== "รอการรีวิว..." ? (
            <p>{review}</p>
          ) : (
            <p className="text-text opacity-40">รอการรีวิว...</p>
          )}
        </div>
        <p className="font-bold">
          โดย :{" "}
          {reviewBy && reviewBy.trim() !== "ไม่ระบุ" ? (
            <span className="font-normal">{reviewBy}</span>
          ) : (
            <span className="font-normal text-text opacity-40">ไม่ระบุ</span>
          )}
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-secondary text-white p-2 w-full rounded-md"
              onClick={doSome}
            >
              ความคิดเห็นจากผู้เชี่ยวชาญ
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="text-left text-text text-base">
              <AlertDialogTitle className="text-xl text-bold text-left text-text">
                รีวิว {foodName}
              </AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-2 text-base">
                <Textarea
                  className="text-base text-text"
                  placeholder="เขียนรีวิว..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <Textarea
                  className="text-base text-text"
                  placeholder="เปลี่ยนจำนวนกำปั้น..."
                  value={gumpunText}
                  onChange={(e) => setGumpunText(e.target.value)}
                />
                {imageDataUrl && (
                  <img
                    src={URL.createObjectURL(imageDataUrl)}
                    // src={imageDataUrl}
                    alt="Food"
                    className="max-w-full h-auto"
                  />
                )}
              </AlertDialogDescription>
              <p className="font-bold">
                โดย: <span className="font-normal">Dr. {staffName}</span>
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row items-center gap-2">
              <AlertDialogAction
                className="bg-secondary text-white text-base rounded-md border-transparent w-full"
                onClick={submitReview}
              >
                ส่งความคิดเห็น
              </AlertDialogAction>
              <AlertDialogCancel className="hover:underline text-base text-secondary rounded-md w-full border-secondary">
                ยกเลิก
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default ReviewCard
