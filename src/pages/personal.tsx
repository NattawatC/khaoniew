"use client"

import { Navbar } from "@/components/Navbar"
import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { PiWarningCircleFill } from "react-icons/pi"

const person1 = {
  name: "สมชาย",
  lastName: "ใจดี",
  age: 30,
  gender: "ชาย",
  address: "123 หมู่ 1 ต.ท่าตูม อ.เมือง จ.เชียงใหม่ 50000",
  tel: "0812345678",
  description:
    "โปรดพิจารณานิสัยการกินของคุณ หากรับประทานอาหารไม่ถูกต้องจะต้องรีบไปพบแพทย์",
  medicalCondition: ["โรคเบาหวาน", "โรคความดันโลหิตสูง"],
}

const personal: NextPage = () => {
  const router = useRouter()

  const goToMainPage = () => {
    router.push("/foodLog")
  }

  return (
    <>
      <Navbar />
      <MainLayout className="flex flex-col gap-4 bg-primary">
        {/* NavBar */}
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">ข้อมูลส่วนตัว</h1>
        </div>

        <div className="flex flex-col gap-4 bg-white rounded-md p-5 text-text text-base">
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              ชื่อ: <span className="font-normal">{person1.name}</span>
            </p>
            <p className="font-bold">
              นามสกุล: <span className="font-normal">{person1.lastName}</span>
            </p>
            <p className="font-bold">
              อายุ: <span className="font-normal">{person1.age}</span>
            </p>
            <p className="font-bold">
              เพศ: <span className="font-normal">{person1.gender}</span>
            </p>
            <p className="font-bold">
              ที่อยู่: <span className="font-normal">{person1.address}</span>
            </p>
            <p className="font-bold">
              เบอร์โทร: <span className="font-normal">{person1.tel}</span>
            </p>
          </div>
          <div className="h-auto">
            <hr className="bg-text opacity-30 rounded h-1" />
          </div>
          <div className="text-[#C31936]">
            <p>โรคประจำตัว:</p>
            <ul className="px-2 ">
              {person1.medicalCondition.map((condition, index) => (
                <li key={index}>- {condition}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-md p-5 text-[#C31936] shadow-lg">
          <p className="flex flex-row gap-1 items-center text-xl font-bold">
            <PiWarningCircleFill size={24} />
            ข้อควรระวัง
          </p>
          <p>{person1.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="bg-secondary text-white text-base rounded-md"
            onClick={goToMainPage}
          >
            กลับสู่หน้าหลัก
          </Button>
          <Button className="bg-transparent underline text-secondary text-base rounded-md ">
            ออกจากระบบ
          </Button>
        </div>
      </MainLayout>
    </>
  )
}

export default personal
