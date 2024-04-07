import { PiWarningCircleFill } from "react-icons/pi"

interface HealthScore {
  score: number
}

const HealthDescription: React.FunctionComponent<HealthScore> = ({ score }) => {
  return (
    <>
      {score === 1 ? (
        <div
          className="bg-white rounded-md p-5 text-[#007D35]
         shadow-lg"
        >
          <p className="flex flex-row gap-1 items-center text-xl font-bold">
            <PiWarningCircleFill size={24} />
            ข้อควรระวัง
          </p>
          <p>
            ระดับความเสี่ยงของสุขภาพคุณอยู่ในระดับ "ตามมาตรฐาน"
            โปรดรักษาวินัยการเลือกรับประทานอาหารของคุณอย่างต่อเนื่อง
          </p>
        </div>
      ) : score === 2 ? (
        <div className="bg-white rounded-md p-5 text-[#ED713D] shadow-lg">
          <p className="flex flex-row gap-1 items-center text-xl font-bold">
            <PiWarningCircleFill size={24} />
            ข้อควรระวัง
          </p>
          <p>
            ระดับความเสี่ยงของสุขภาพคุณอยู่ในระดับ "เสี่ยงต่ำกว่ามาตรฐาน"
            โปรดพิจารณาการเลือกรับประทานอาหารของคุณใหม่
          </p>
        </div>
      ) : score === 3 ? (
        <div className="bg-white rounded-md p-5 text-[#C31936] shadow-lg">
          <p className="flex flex-row gap-1 items-center text-xl font-bold">
            <PiWarningCircleFill size={24} />
            ข้อควรระวัง
          </p>
          <p>
            ระดับความเสี่ยงของสุขภาพคุณอยู่ในระดับ "ต่ำกว่ามาตรฐาน"
            กรุณาไปพบแพทย์
          </p>
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
