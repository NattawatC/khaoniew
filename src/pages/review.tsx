import Gumpun from "@/components/Gumpun"
import ReviewCard from "@/components/ReviewCard"
import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface FoodData {
  id: number
  date: string
  mealTime: string
  imageId: number
  food: {
    name: string
    score: string
  }
  feedback: {
    score: string
    review: string
    reviewBy: string
  }
}

const Review: NextPage = () => {
  const router = useRouter()
  const [foodData, setFoodData] = useState<FoodData[]>([])
  const { firstName, lastName, healthRiskScore, patientMealData, thaiId } =
    router.query

  useEffect(() => {
    if (patientMealData) {
      const parsedData: FoodData[] = JSON.parse(patientMealData as string)
      setFoodData(parsedData)
    }
  }, [patientMealData])

  const healthRiskScoreInt =
    typeof healthRiskScore === "string" ? parseInt(healthRiskScore, 10) : 0
  const convertedThaiId = String(thaiId)

  const totalScore = foodData.reduce(
    (acc, curr) => acc + parseInt(curr.food.score),
    0
  )

  const updateReviewCallback = async () => {
    try {
      const response = await fetch(
        `http://localhost:4263/patients/${thaiId}/meals`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch food data")
      }
      const data = await response.json()
      setFoodData(data)
      console.log("review foodData", foodData)
    } catch (error) {
      console.error("Error fetching food data:", error)
    }
  }

  const goToPatientPage = () => {
    router.push("/patient")
  }

  return (
    <>
      {/* <Navbar /> */}
      <MainLayout className="flex flex-col gap-4 bg-primary">
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">
            {firstName} {lastName}
          </h1>
          <Gumpun score={healthRiskScoreInt} totalScore={totalScore} />
        </div>

        <div className="flex flex-col gap-4">
          {foodData.map((foodItem, index) => (
            <ReviewCard
              key={index}
              patientId={convertedThaiId}
              mealId={foodItem.id}
              date={foodItem.date}
              meal={foodItem.mealTime}
              foodName={foodItem.food.name}
              imageId={foodItem.imageId}
              score={foodItem.food.score}
              review={foodItem.feedback.review}
              reviewBy={foodItem.feedback.reviewBy}
              updateReviewCallback={updateReviewCallback}
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
