import { Gumpun } from "@/components/Gumpun"
import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa"

export default function foodLog() {
  return (
    <>
      <MainLayout className="flex flex-col gap-8">
        {/* NavBar */}
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-center text-3xl">บันทึกการบริโภค</h1>
          <Gumpun />
        </div>
        <p className="text-xl">รายการบริโภควันนี้</p>
        <Button className="flex w-full text-base gap-2 bg-secondary text-primary">
          เพิ่ม <FaPlus size="12" />
        </Button>
        <div className="flex flex-col items-center justify-centers">
          <p>คุณยังไม่มีรายการบริโภค</p>
          <p className="flex justify-center">
            กรุณากด<span className="text-secondary">&nbsp;เพิ่ม +&nbsp;</span>
            เพื่อสร้างบันทึกใหม่
          </p>
        </div>
      </MainLayout>
    </>
  )
}
