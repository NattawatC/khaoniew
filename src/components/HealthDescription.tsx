import { PiWarningCircleFill } from "react-icons/pi"

interface HealthScore {
  score: number
}

const HealthDescription: React.FunctionComponent<HealthScore> = ({ score }) => {
  return (
    <div className="bg-white rounded-md p-5 text-[#C31936] shadow-lg">
      <p className="flex flex-row gap-1 items-center text-xl font-bold">
        <PiWarningCircleFill size={24} />
        ข้อควรระวัง
      </p>
      {/* <p>{person1.description}</p> */}
      <p>{score}</p>
      {score === 0 ? (
        // Render when HealthScore is 0
        <p>HealthScore is 0</p>
      ) : score ? (
        // Render when score is 1, 2, or 3
        <p>score is 1, 2, or 3</p>
      ) : (
        // Render for other cases
        <p>score is neither 0 nor 1, 2, 3</p>
      )}
    </div>
  )
}
export default HealthDescription
