import { Button } from "@/components/ui/button"
import { PersonIcon } from "@radix-ui/react-icons"
import Cloche from "@/assets/cloche.png"
import Image from "next/image"
import { useRouter } from "next/router"

export const Navbar: React.FC = () => {
  const router = useRouter()

  const goToMainPage = () => {
    router.push("/foodLog")
  }

  const goToPersonalPage = () => {
    router.push("/personal")
  }

  return (
    <div className="flex flex-row justify-between bg-primary px-4 py-2">
      <Button
        className="bg-transparent text-white text-base rounded-full w-auto p-0"
        onClick={goToMainPage}
      >
        <Image src={Cloche} alt="logo" width={40} height={40} />
      </Button>
      <Button
        className="bg-secondary text-white rounded-full w-auto h-auto p-2"
        onClick={goToPersonalPage}
      >
        <PersonIcon width={24} height={24} />
      </Button>
    </div>
  )
}
