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
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import React, { useState } from "react"
import { FaFistRaised } from "react-icons/fa"
import { PiWarningCircleFill } from "react-icons/pi"

interface FoodCardProps {
  id: number
  date: string
  meal: string
  foodName: string
  carbs: string
  review: string
  reviewBy: string
  onDelete: (id: number) => void
}

const FoodCard: React.FunctionComponent<FoodCardProps> = ({
  id,
  date,
  meal,
  foodName,
  carbs,
  review,
  reviewBy,
  onDelete,
}) => {
  const [showButton, setShowButton] = useState(false)

  const formattedDate = new Date(date).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const handleDelete = () => {
    onDelete(id)
  }

  console.log(showButton)

  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-5 text-text">
      <div className="flex justify-end w-auto">
        <Button
          className="bg-transparent p-0 h-5 text-text"
          onClick={() => setShowButton(!showButton)}
        >
          <DotsHorizontalIcon width={24} height={24} />
        </Button>
      </div>
      {showButton ? (
        <div className="flex flex-row gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-secondary bg-secondary text-white p-2 w-full rounded-md hover:underline"
              >
                ลบ
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl">
                  ลบรายการอาหาร
                </AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col gap-2 text-base">
                  <p>
                    คุณต้องการจะลบ {foodName} ออกจากบันทึกการบริโภคของคุณหรือไม่
                  </p>
                  <p className="flex flex-row items-center justify-center text-secondary">
                    <PiWarningCircleFill className="text-secondary" size={20} />{" "}
                    คุณไม่สามารถกู้คืนข้อมูลได้ภายหลัง
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-row items-center gap-2">
                <AlertDialogAction className="bg-secondary text-white text-base rounded-md border-transparent w-full">
                  <Button
                    className="bg-transparent w-full"
                    onClick={handleDelete}
                  >
                    ลบรายการอาหาร
                  </Button>
                </AlertDialogAction>
                <AlertDialogCancel className="hover:underline text-base text-secondary rounded-md w-full border-secondary">
                  ยกเลิก
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/* <Button className="bg-secondary text-white p-2 w-full rounded-md">
            แก้ไข
          </Button> */}
        </div>
      ) : null}
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
              คาร์โบไฮเดรต : <span className="font-normal">{carbs}</span>
            </p>
            <FaFistRaised size={20} />
          </div>
        </div>
        <div className="h-auto">
          <hr className="bg-text opacity-30 rounded h-1" />
        </div>

        <div className="flex flex-col">
          <p className="font-bold">รีวิว :</p>
          {review && review.trim() !== "รอการรีวิว..." ? (
            <p>{review}</p>
          ) : (
            <p className="text-text opacity-40">รอการรีวิว...</p>
          )}
        </div>
        <p className="font-bold">
          รีวิวโดย :{" "}
          {reviewBy && reviewBy.trim() !== "ไม่ระบุ" ? (
            <span className="font-normal">{reviewBy}</span>
          ) : (
            <span className="font-normal text-text opacity-40">ไม่ระบุ</span>
          )}
        </p>
      </div>
    </div>
  )
}

export default FoodCard
