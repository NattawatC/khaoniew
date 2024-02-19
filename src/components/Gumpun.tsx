import { FaFistRaised } from "react-icons/fa"

const userCrab = 1
const totalCarb = 15

export const Gumpun: React.FC = () => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center rounded-md bg-white py-4">
      <p className="font-bold">คาร์บวันนี้ :</p>
      <p>{userCrab}</p>
      <p>/ {totalCarb}</p>
      <FaFistRaised size={20}/>
    </div>
  )
}
