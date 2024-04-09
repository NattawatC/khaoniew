"use client"

import FoodCard from "@/components/FoodCard"
import Gumpun from "@/components/Gumpun"
import { Navbar } from "@/components/Navbar"
import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@tremor/react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { totalmem } from "os"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"

interface FoodData {
  id: number
  date: string
  mealTime: string
  food: {
    name: string
    score: string
  }
  feedback: {
    review: string
    reviewBy: string
  }
}

interface PatientData {
  thaiId: string
  password: string
  firstname: string
  lastname: string
  age: number
  gender: string
  address: string
  phoneNumber: string
  healthRiskScore: number
}

const data = [
  {
    date: "จัน",
    carbs: 30,
  },
  {
    date: "อังคาร",
    carbs: 10,
  },
  {
    date: "พุธ",
    carbs: 20,
  },
  {
    date: "พฤหัส",
    carbs: 5,
  },
  {
    date: "ศุกร์",
    carbs: 3,
  },
  {
    date: "เสาร์",
    carbs: 9,
  },
  {
    date: "อาทิต",
    carbs: 2,
  },
]

// const dataFormatter = (number: number) =>
//   Intl.NumberFormat("us").format(number).toString()

// console.log(dataFormatter(1000000))

const FoodLog: NextPage = () => {
  const router = useRouter()
  const [showComparison, setShowComparison] = useState(false)
  const [patient, setPatient] = useState<PatientData>({} as PatientData)
  const [foodData, setFoodData] = useState<FoodData[]>([])
  const patientId = localStorage.getItem("patientId")
  const totalScore = foodData.reduce((acc, curr) => acc + parseInt(curr.food.score), 0)

  useEffect(() => {
    fetch(`http://localhost:4263/patients/${patientId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        setPatient(data)
        console.log("Patient data fetched successfully:", data)
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error)
      })
  }, [])

  const fetchFoodData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4263/patients/${patientId}/meals`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch food data")
      }
      const data = await response.json()
      setFoodData(data)
    } catch (error) {
      console.error("Error fetching food data:", error)
    }
  }

  const deleteMeal = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:4263/patients/${patientId}/meals/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to delete meal")
      }

      // Fetch meal data again after deletion
      fetchFoodData()
    } catch (error) {
      console.error("Error deleting meal:", error)
    }
  }

  useEffect(() => {
    if (!patientId) {
      return
    }

    fetchFoodData()
  }, [patientId])


  const goToAddFood = () => {
    router.push("/addFood")
  }

  return (
    <>
      <Navbar />
      <MainLayout className="flex flex-col gap-8 bg-primary ">
        <Tabs defaultValue="บันทึกการบริโภค" className="flex flex-col w-auto">
          <TabsList className="w-full text-xl">
            <TabsTrigger className="text-xl text-text" value="บันทึกการบริโภค">
              บันทึกการบริโภค
            </TabsTrigger>
            <TabsTrigger className="text-xl text-text" value="ประวัติการบริโภค">
              ประวัติการบริโภค
            </TabsTrigger>
          </TabsList>
          <TabsContent value="บันทึกการบริโภค" className="flex flex-col gap-8 ">
            <div className="flex flex-col gap-4">
              <h1 className="flex justify-center text-3xl pt-8">
                บันทึกการบริโภค
              </h1>
              <Gumpun score={patient.healthRiskScore} totalScore={totalScore}/>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl">รายการบริโภควันนี้</p>
              <Button
                className="flex w-full text-base gap-2 bg-secondary text-primary rounded-md"
                onClick={goToAddFood}
              >
                เพิ่ม <FaPlus size="12" />
              </Button>

              {foodData.length === 0 ? (
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
                  {foodData.map((foodItem, index) => (
                    <FoodCard
                      key={index}
                      id={foodItem.id}
                      date={foodItem.date}
                      meal={foodItem.mealTime}
                      foodName={foodItem.food.name}
                      carbs={foodItem.food.score}
                      review={foodItem.feedback.review}
                      reviewBy={foodItem.feedback.reviewBy}
                      onDelete={deleteMeal}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="ประวัติการบริโภค">
            <Tabs
              defaultValue="รายวัน"
              className="flex flex-col w-auto gap-4 pt-8"
            >
              <TabsList className="w-full text-xl justify-between">
                <TabsTrigger value="รายวัน">รายวัน</TabsTrigger>
                <TabsTrigger value="รายสัปดาห์">รายสัปดาห์</TabsTrigger>
                <TabsTrigger value="รายเดือน">รายเดือน</TabsTrigger>
              </TabsList>
              <TabsContent value="รายวัน">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="flex text-lg font-medium text-text justify-center">
                      ปริมาณการบริโภคคาร์บ ต่อวัน
                    </h3>
                    <hr className="bg-text opacity-30 rounded h-1" />
                  </div>
                  <div className="px-5 bg-white rounded-md ">
                    <BarChart
                      className="h-72 text-tremor-content-subtle borderRadius-tremor-default tremor-background-muted"
                      data={data}
                      index="date"
                      categories={["carbs"]}
                      colors={["#B12753"]}
                      yAxisWidth={30}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="รายสัปดาห์">รายสัปดาห์</TabsContent>
              <TabsContent value="รายเดือน">รายเดือน</TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </MainLayout>
    </>
  )
}

export default FoodLog
