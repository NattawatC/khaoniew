import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import React from "react"

interface PatientCardProps {
  status: boolean
  firstName: string
  lastName: string
  age: number
  gender: string
  medicalCondition: string
  patientId: string
}

const PatientCard: React.FunctionComponent<PatientCardProps> = ({
  status,
  firstName,
  lastName,
  age,
  gender,
  medicalCondition,
  patientId,
}) => {
  const router = useRouter()

  const goToReviewPage = async () => {
    try {
      const response = await fetch(
        `http://localhost:4263/patients/${patientId}/meals`
      )
      const response2 = await fetch(
        `http://localhost:4263/patients/${patientId}`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch food data")
      }
      const patientMealData = await response.json()
      const patientData = await response2.json()
      console.log("Food data:", patientMealData)
      router.push({
        pathname: "/review",
        query: {
          patientMealData: JSON.stringify(patientMealData),
          thaiId: patientData.thaiId,
          firstName: patientData.firstname,
          lastName: patientData.lastname,
          healthRiskScore: patientData.healthRiskScore,
        },
      })
    } catch (error) {
      console.error("Error fetching food data:", error)
    }
  }

  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-5 text-text relative">
      {status === true ? (
        <Badge className="w-auto absolute right-0 mr-4 text-xs bg-[#AD9E9F] text-white font-normal">
          รีวิวเรียบร้อย
        </Badge>
      ) : (
        <Badge className="w-auto absolute right-0 mr-4 text-xs bg-secondary text-white font-normal">
          รอการรีวิว...
        </Badge>
      )}
      <div className="flex flex-col gap-1 text-base">
        <p className="font-bold">
          ชื่อ : <span className="font-normal">{firstName}</span>
        </p>
        <p className="font-bold">
          นามสกุล : <span className="font-normal">{lastName}</span>
        </p>
        <p className="font-bold">
          อายุ : <span className="font-normal">{age}</span>
        </p>
        <p className="font-bold">
          เพศ : <span className="font-normal">{gender}</span>
        </p>
      </div>
      <div className="h-auto">
        <hr className="bg-text opacity-30 rounded h-1" />
      </div>

      <p className="font-bold">
        - <span className="font-normal">{medicalCondition}</span>
      </p>

      {/* <div>
        <p className="font-bold text-secondary">โรคประจำตัว</p>
        <ul className="text-base font-normal text-secondary px-2">
          {medicalCondition.map((condition) => (
            <li key={condition}>- {condition}</li>
          ))}
        </ul>
      </div> */}
      <Button
        onClick={goToReviewPage}
        className="bg-secondary text-white text-base rounded-md"
      >
        ดูข้อมูล
      </Button>
    </div>
  )
}

export default PatientCard
