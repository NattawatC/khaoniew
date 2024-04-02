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
  meal: string
  foodName: string
  carbs: number
  review: string
  reviewBy: string
}

const ReviewCard: React.FunctionComponent<FoodCardProps> = ({
  date,
  meal,
  foodName,
  carbs,
  review,
  reviewBy,
}) => {
  const [showButton, setShowButton] = useState(false)

  console.log(showButton)

  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-5 text-text">
      <div className="flex flex-row gap-3"></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-bold">
            บันทึกประจำวันที่ : <span className="font-normal">{date}</span>
          </p>
          <p className="font-bold">
            มื้ออาหาร : <span className="font-normal">{meal}</span>
          </p>
          <p className="font-bold">
            ชื่ออาหาร : <span className="font-normal">{foodName}</span>
          </p>
          <div className="flex flex-row items-center gap-2">
            <p className="font-bold">
              คาร์โบไฮเดรต : <span className="font-normal">{carbs}</span>
            </p>
            <FaFistRaised size={20} />
          </div>
        </div>
        <div className="h-auto">
          <hr className="bg-text opacity-30 rounded h-1" />
        </div>

        <div className="flex flex-col">
          <p className="font-bold">ความคิดเห็นจากผู้เชี่ยวชาญ :</p>
          {review && review.trim() !== "" ? (
            <p>{review}</p>
          ) : (
            <p className="text-text opacity-40">รอการรีวิว...</p>
          )}
        </div>
        <p className="font-bold">
          โดย :{" "}
          {reviewBy && reviewBy.trim() !== "" ? (
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
                />
              </AlertDialogDescription>
                <p className="font-bold">โดย: <span className="font-normal">???</span></p>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row items-center gap-2">
              <AlertDialogAction className="bg-secondary text-white text-base rounded-md border-transparent w-full">
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
