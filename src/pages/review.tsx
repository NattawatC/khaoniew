"use client"

import { Gumpun } from "@/components/Gumpun"
import { Navbar } from "@/components/Navbar"
import { MainLayout } from "@/components/layout"
import { NextPage } from "next"
import { useRouter } from "next/router"
import ReviewCard from "@/components/ReviewCard"
import { Button } from "@/components/ui/button"

const Patientprops = [
  {
    status: "Not approved",
    firstName: "สมชาย",
    lastName: "ใจดี",
    age: 30,
    gender: "ชาย",
    address: "123 หมู่ 1 ต.ท่าตูม อ.เมือง จ.เชียงใหม่ 50000",
    tel: "0812345678",
    description:
      "โปรดพิจารณานิสัยการกินของคุณ หากรับประทานอาหารไม่ถูกต้องจะต้องรีบไปพบแพทย์",
    medicalCondition: ["โรคเบาหวาน", "โรคความดันโลหิตสูง"],
  },
]

const Foodprops = [
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
]




const Review: NextPage = () => {
  const router = useRouter()
  const { firstName, lastName } = router.query

  const goToPatientPage = () => {
    router.push("/patient")
}

  return (
    <>
      <Navbar />
      <MainLayout className="flex flex-col gap-4 bg-primary">
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">
            {firstName} {lastName}
          </h1>
          <Gumpun />
        </div>

        <div className="flex flex-col gap-4">
          {Foodprops.map((props, item) => (
            <ReviewCard
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
        <Button
            className="bg-secondary text-white text-base rounded-md"
            onClick={goToPatientPage}
          >
            กลับสู่รายชื่อผู้ใช้
          </Button>
      </MainLayout>
    </>
  )
}

export default Review
