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
  updateReviewCallback,
}) => {
  const [reviewText, setReviewText] = useState("")
  const [gumpunText, setGumpunText] = useState(score)
  const staffName =
    typeof window !== "undefined" ? localStorage.getItem("staffName") : null
  const formattedDate = new Date(date).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

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
            <Button className="bg-secondary text-white p-2 w-full rounded-md">
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
