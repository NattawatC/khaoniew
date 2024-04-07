import { PiWarningCircleFill } from "react-icons/pi"

interface HealthScore {
  score: number
}

const HealthDescription: React.FunctionComponent<HealthScore> = ({ score }) => {
  return (
    <>
      {score === 1 ? (
        <div className="bg-white rounded-md p-5 text-[#C9E3F1] shadow-lg">
          <p className="flex flex-row gap-1 items-center text-xl font-bold">
            <PiWarningCircleFill size={24} />
            ข้อควรระวัง
          </p>
          <p>{score}</p>
        </div>
      ) : score === 2 ? (
        <div className="bg-white rounded-md p-5 text-[#ED713D] shadow-lg">
          <p className="flex flex-row gap-1 items-center text-xl font-bold">
            <PiWarningCircleFill size={24} />
            ข้อควรระวัง
          </p>
          <p>{score}</p>
        </div>
      ) : score === 3 ? (
        <div className="bg-white rounded-md p-5 text-[#C31936] shadow-lg">
          <p className="flex flex-row gap-1 items-center text-xl font-bold">
            <PiWarningCircleFill size={24} />
            ข้อควรระวัง
          </p>
          <p>{score}</p>
        </div>
      ) : (
        <div className="bg-white rounded-md p-5 text-text shadow-lg">
          <p className="flex flex-row gap-1 items-center text-xl font-bold">
            <PiWarningCircleFill size={24} />
            ข้อควรระวัง
          </p>
          <p>{score}</p>
        </div>
      )}
    </>
  )
}
export default HealthDescription
