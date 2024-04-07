import { FaFistRaised } from "react-icons/fa"
//if health risk score = 1, whole day 150grams = 1gumpun = 15g
//if health risk score = 2, whole day 120grams = 1gumpun = 12g
//if health risk score = 3, whole day 90grams = 1gumpun = 9g
const userCrab = 1
const totalCarb = 15

export const Gumpun: React.FC = () => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center rounded-md bg-white py-4">
      <p className="font-bold">คาร์บวันนี้ :</p>
      <p>{userCrab}</p>
      <p>/ {totalCarb}</p>
      <FaFistRaised size={20} />
    </div>
  )
}
