import { FaFistRaised } from "react-icons/fa"

interface HealthScore {
  totalScore: number
  score: number
}
// 1 gumpun = 10grams
//if health risk score = 1 = 15gp
//if health risk score = 2 = 12gp
//if health risk score = 3 = 9gp

const Gumpun: React.FunctionComponent<HealthScore> = ({
  totalScore,
  score,
}) => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center rounded-md bg-white py-4">
      {score === 1 ? (
        <>
          {totalScore > 15 ? (
            <p className="text-secondary">โปรดพิจารณานิสัยการกินของคุณ</p>
          ) : (
            <>
              <p className="font-bold">คาร์บวันนี้ :</p>
              <p>{totalScore}</p>
              <p>/ 15</p>
              <FaFistRaised size={20} />
            </>
          )}
        </>
      ) : score === 2 ? (
        <>
          <p className="font-bold">คาร์บวันนี้ :</p>
          {totalScore > 12 ? (
            <p>โปรดพิจารณานิสัยการกินของคุณ</p>
          ) : (
            <>
              <p>{totalScore}</p>
              <p>/ 12</p>
            </>
          )}
          <FaFistRaised size={20} />
        </>
      ) : score === 3 ? (
        <>
          <p className="font-bold">คาร์บวันนี้ :</p>
          {totalScore > 9 ? (
            <p>โปรดพิจารณานิสัยการกินของคุณ</p>
          ) : (
            <>
              <p>{totalScore}</p>
              <p>/ 9</p>
            </>
          )}
          <FaFistRaised size={20} />
        </>
      ) : (
        <p>โปรดลงทะเบียนผู้ใช้</p>
      )}
    </div>
  )
}

export default Gumpun
