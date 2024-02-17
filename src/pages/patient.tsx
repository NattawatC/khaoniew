"use client"

import { Navbar } from "@/components/Navbar"
import { MainLayout } from "@/components/layout"
import PatientCard from "@/components/patientCard"
import { NextPage } from "next"
import { useRouter } from "next/router"

const props = [
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
  {
    status: "Approved",
    firstName: "สมหญิง",
    lastName: "ใจดี",
    age: 30,
    gender: "หญิง",
    address: "123 หมู่ 1 ต.ท่าตูม อ.เมือง จ.เชียงใหม่ 50000",
    tel: "0812345678",
    description:
      "โปรดพิจารณานิสัยการกินของคุณ หากรับประทานอาหารไม่ถูกต้องจะต้องรีบไปพบแพทย์",
    medicalCondition: ["โรคเบาหวาน", "โรคความดันโลหิตสูง"],
  },
]

const Patient: NextPage = () => {
  const router = useRouter()

  const goToAddFood = () => {
    router.push("/addFood")
  }

  return (
    <>
      <Navbar />
      <MainLayout className="flex flex-col gap-4 bg-primary">
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">รายชื่อผู้ใช้</h1>
        </div>
        <div className="flex flex-col gap-4">
          {props.map((person, item) => (
            <PatientCard
              key={item}
              status={person.status}
              firstName={person.firstName}
              lastName={person.lastName}
              age={person.age}
              gender={person.gender}
              medicalCondition={person.medicalCondition}
            />
          ))}
        </div>
      </MainLayout>
    </>
  )
}

export default Patient
