"use client"

import { Navbar } from "@/components/Navbar"
import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { FaFistRaised } from "react-icons/fa"

const result: NextPage = () => {
  const router = useRouter()

  const { data, score } = router.query
  const result = JSON.parse(data as string)

  const formattedDate = new Date(result.date).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const goToMainPage = () => {
    router.push("/foodLog")
  }

  return (
    <>
      <Navbar />
      <MainLayout className="flex flex-col gap-4 bg-primary">
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">ผลการบันทึก</h1>
        </div>

        <div className="flex flex-col gap-4 bg-white rounded-md p-5 text-text text-base">
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              บันทึกประจำวันที่ :{" "}
              <span className="font-normal">{formattedDate}</span>
            </p>
            <p className="font-bold">
              มื้ออาหาร : <span className="font-normal">{result.mealTime}</span>
            </p>
            <p className="font-bold">
              ชื่ออาหาร :{" "}
              <span className="font-normal">{result.food.name}</span>
            </p>
            <div className="h-auto">
              <hr className="bg-text opacity-30 rounded h-1" />
            </div>
            <p className="font-bold">
              ปริมาณคาร์โบไฮเดรต :{" "}
              <span className="font-normal">{score} กรัม</span> 
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 justify-center px-2 py-3">
          <p className="font-bold text-xl">รวม: </p>
          <p className="text-base ">{result.food.score}</p>
          <FaFistRaised size={20} />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="bg-secondary text-white text-base rounded-md"
            onClick={goToMainPage}
          >
            กลับสู่หน้าหลัก
          </Button>
        </div>
      </MainLayout>
    </>
  )
}

export default result
