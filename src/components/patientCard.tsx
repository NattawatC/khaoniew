import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import React from "react"
import { useRouter } from "next/router"

interface PatientCardProps {
  status: string
  firstName: string
  lastName: string
  age: number
  gender: string
  // medicalCondition: string[]
  medicalCondition: string
}

const PatientCard: React.FunctionComponent<PatientCardProps> = ({
  status,
  firstName,
  lastName,
  age,
  gender,
  medicalCondition,
}) => {

  const router = useRouter()

  const goToReviewPage = () =>{
    router.push({
      pathname: '/review',
      query: { firstName, lastName},
    });
  }

  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-5 text-text relative">
      {status === "Not approved" ? (
        <Badge className="w-auto absolute right-0 mr-4 text-xs bg-[#AD9E9F] text-white">
          {status}
        </Badge>
      ) : (
        <Badge className="w-auto absolute right-0 mr-4 text-xs bg-secondary text-white">
          {status}
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
      <Button onClick={goToReviewPage} className="bg-secondary text-white text-base rounded-md">
        ดูข้อมูล
      </Button>
    </div>
  )
}

export default PatientCard
