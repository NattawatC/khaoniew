"use client"

import { Gumpun } from "@/components/Gumpun"
import FoodCard from "@/components/foodCard"
import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { FaPlus } from "react-icons/fa"

const props = [
  {
    date: "2021-10-10",
    meal: "มื้อเช้า",
    foodName: "ข้าวเหนียวหมูทอด",
    carbs: 50,
    review: "",
    reviewBy: "",
  },
  {
    date: "2021-10-10",
    meal: "มื้อกลางวัน",
    foodName: "กะเพราหมูสับ",
    carbs: 50,
    review: "อร่อยมาก",
    reviewBy: "เจษฎา",
  },
  {
    date: "2021-10-10",
    meal: "มื้อเย็น",
    foodName: "ข้าวมันไก่",
    carbs: 50,
    review: "อร่อยมาก",
    reviewBy: "เจษฎา",
  },
]

const FoodLog: NextPage = () => {
  const router = useRouter()

  const goToAddFood = () => {
    router.push("/addFood")
  }

  return (
    <>
      <MainLayout className="flex flex-col gap-8 bg-primary">
        {/* NavBar */}
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">บันทึกการบริโภค</h1>
          <Gumpun />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl">รายการบริโภควันนี้</p>
          <Button className="flex w-full text-base gap-2 bg-secondary text-primary rounded-md" onClick={goToAddFood}>
            เพิ่ม <FaPlus size="12" />
          </Button>

          {props.length === 0 ? (
            <div className="flex flex-col items-center justify-centers">
              <p>คุณยังไม่มีรายการบริโภค</p>
              <p className="flex justify-center">
                กรุณากด
                <span className="text-secondary">&nbsp;เพิ่ม +&nbsp;</span>
                เพื่อสร้างบันทึกใหม่
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {props.map((props, item) => (
                <FoodCard
                  key={item}
                  date={props.date}
                  meal={props.meal}
                  foodName={props.foodName}
                  carbs={props.carbs}
                  review={props.review}
                  reviewBy={props.reviewBy}
                />
              ))}
            </div>
          )}
        </div>
      </MainLayout>
    </>
  )
}

export default FoodLog
