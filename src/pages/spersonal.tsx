"use client"

import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface StaffData {
  id: string
  fullName: string
  address: string
}

const spersonal: NextPage = () => {
  const router = useRouter()
  const [staff, setStaff] = useState<StaffData>({} as StaffData)
  const staffName = localStorage.getItem("staffName")

  //value will be received from route later on
  //fetch patients table by thaiId
  useEffect(() => {
    fetch(`http://localhost:4263/staffs/${staffName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        console.log(response.json)        
        return response.json()
      })
      .then((data) => {
        setStaff(data)
        console.log("Staff data fetched successfully:", data)
      })
      .catch((error) => {
        console.error("Error fetching Staff data:", error)
      })
  }, [])

  const goToMainPage = () => {
    router.push("/patient")
  }

  const logout = () => {
    router.push("/login")
  }

  return (
    <>
      <MainLayout className="flex flex-col gap-4 bg-primary">
        {/* NavBar */}
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">ข้อมูลส่วนตัว</h1>
        </div>

        <div className="flex flex-col gap-4 bg-white rounded-md p-5 text-text text-base">
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              ชื่อ: <span className="font-normal">{staff.fullName}</span>
            </p>
            <p className="font-bold">
              โรงพยาบาล: <span className="font-normal">{staff.address}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="bg-secondary text-white text-base rounded-md"
            onClick={goToMainPage}
          >
            กลับสู่หน้าหลัก
          </Button>
          <Button
            className="bg-transparent underline text-secondary text-base rounded-md"
            onClick={logout}
          >
            ออกจากระบบ
          </Button>
        </div>
      </MainLayout>
    </>
  )
}

export default spersonal
