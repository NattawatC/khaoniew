import ImageUploader from "@/components/ImageUploader"
import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import io from "socket.io-client"
import { z } from "zod"

const socket = io("ws://localhost:4263")
socket.on("connect", () => {
  console.log("Connected to SOCKET server")
})

const formSchema = z.object({
  date: z.date(),
  mealTime: z.string(),
  name: z.string(),
  score: z.string(),
})

export function FoodForm() {
  const router = useRouter()
  const [pixelArray, setPixelArray] = useState<number[][] | null>(null)
  const patientId =
    typeof window !== "undefined" ? localStorage.getItem("patientId") : null
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealTime: "",
      name: "",
      score: "",
    },
  })

  console.log(patientId)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    try {
      const response = await fetch(
        `http://localhost:4263/patients/${patientId}/meals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to create meal")
      }
      const resultData = await response.json()
      router.push({
        pathname: "/result",
        query: { data: JSON.stringify(resultData), score: values.score },
      })
    } catch (error) {
      console.error("Error creating meal:", error)
    }
  }

  function unSubmit() {
    router.push("/foodLog")
  }

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // const handleUpload = async (files: File[]) => {
  //   try {
  //     const file = files[0]
  //     const imageUrl = URL.createObjectURL(file)
  //     setUploadedFiles([file])
  //     const img = new Image()
  //     img.onload = () => {
  //       const canvas = document.createElement("canvas")
  //       const ctx = canvas.getContext("2d")
  //       if (!ctx) {
  //         console.error("Canvas context not supported")
  //         return
  //       }
  //       canvas.width = img.width
  //       canvas.height = img.height
  //       ctx.drawImage(img, 0, 0)

  //       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  //       const pixelArray: number[][] = []

  //       for (let i = 0; i < imageData.data.length; i += 4) {
  //         const r = imageData.data[i]
  //         const g = imageData.data[i + 1]
  //         const b = imageData.data[i + 2]
  //         const a = imageData.data[i + 3]
  //         pixelArray.push([r, g, b, a])
  //       }
  //       console.log("image details: ", files)
  //       console.log("Pixel Array before convert to Byte Array:", pixelArray)
  //       setPixelArray(pixelArray)
  //       const byteArray = pixelArray.flatMap((pixel) =>
  //         pixel.map((value) => value & 0xff)
  //       )
  //       const uint8Array = new Uint8Array(byteArray)
  //       console.log("Pixel Array converted to Byte Array:", uint8Array)

  //       const heightWidthByteArray = new Uint8Array([
  //         (img.height >> 8) & 0xff,
  //         img.height & 0xff,
  //         (img.width >> 8) & 0xff,
  //         img.width & 0xff,
  //       ])

  //       console.log(
  //         "Image size in byte array before concantenation:",
  //         heightWidthByteArray
  //       )

  //       const dataToSend = new Uint8Array(
  //         heightWidthByteArray.length + uint8Array.length
  //       )
  //       dataToSend.set(heightWidthByteArray)
  //       dataToSend.set(uint8Array, heightWidthByteArray.length)

  //       console.log(dataToSend)
  //       socket.emit("binaryData", dataToSend, (confirmation: Uint8Array) => {
  //         console.log("Image Sent to AI:", confirmation) // Server's acknowledgment
  //       })

  //       //sending bytearray without height x width
  //       // socket.emit("binaryData", uint8Array, (confirmation: Uint8Array) => {
  //       //   console.log("Image Sent to AI:", confirmation)
  //       // })
  //     }

  //     img.src = imageUrl
  //   } catch (error) {
  //     console.error("Error handling upload:", error)
  //   }
  // }

  const downloadDataAsJson = (data: Uint8Array, filename: string) => {
    const json = JSON.stringify(data)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleUploadWrapper = (files: File[]) => {
    // Pass null as foodName because it's not available at the time of upload
    handleUpload(files, "กะเพรา")
  }

  const handleUpload = async (files: File[], foodName: string | null) => {
    try {
      const file = files[0]
      const imageUrl = URL.createObjectURL(file)
      setUploadedFiles([file])

      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          console.error("Canvas context not supported")
          return
        }
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixelArray: number[][] = []

        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i]
          const g = imageData.data[i + 1]
          const b = imageData.data[i + 2]
          const a = imageData.data[i + 3]
          pixelArray.push([r, g, b, a])
        }

        console.log("image details: ", files)
        console.log("Pixel Array before convert to Byte Array:", pixelArray)
        setPixelArray(pixelArray)
        const byteArray = pixelArray.flatMap((pixel) =>
          pixel.map((value) => value & 0xff)
        )
        const uint8Array = new Uint8Array(byteArray)
        console.log("Pixel Array converted to Byte Array:", uint8Array)

        // Create byte array for height and width
        const heightByteArray = new Uint8Array([
          (img.height >> 8) & 0xff,
          img.height & 0xff,
        ])
        const widthByteArray = new Uint8Array([
          (img.width >> 8) & 0xff,
          img.width & 0xff,
        ])

        console.log(
          "Image size in byte array before concatenation:",
          heightByteArray,
          widthByteArray
        )

        // Create foodAiAuto version
        const foodAiAutoHeader = new Uint8Array([0])
        const dataToSendFoodAiAuto = new Uint8Array(
          foodAiAutoHeader.length +
            heightByteArray.length +
            widthByteArray.length +
            uint8Array.length
        )
        dataToSendFoodAiAuto.set(foodAiAutoHeader)
        let offsetAuto = foodAiAutoHeader.length
        dataToSendFoodAiAuto.set(heightByteArray, offsetAuto)
        offsetAuto += heightByteArray.length
        dataToSendFoodAiAuto.set(widthByteArray, offsetAuto)
        offsetAuto += widthByteArray.length
        dataToSendFoodAiAuto.set(uint8Array, offsetAuto)

        // Create foodAiManual version
        const foodAiManualHeader = new Uint8Array([1])
        const foodNameByteArray = new TextEncoder().encode(foodName || "")
        const nameLengthByteArray = new Uint8Array([
          (foodNameByteArray.length >> 8) & 0xff,
          foodNameByteArray.length & 0xff,
        ])
        const dataToSendFoodAiManual = new Uint8Array(
          foodAiManualHeader.length +
            nameLengthByteArray.length +
            foodNameByteArray.length
        )
        dataToSendFoodAiManual.set(foodAiManualHeader)
        let offsetManual = foodAiManualHeader.length
        dataToSendFoodAiManual.set(nameLengthByteArray, offsetManual)
        offsetManual += nameLengthByteArray.length
        dataToSendFoodAiManual.set(foodNameByteArray, offsetManual)

        console.log("Final dataToSend for foodAiAuto:", dataToSendFoodAiAuto)
        socket.emit(
          "binaryData",
          dataToSendFoodAiAuto,
          (confirmation: Uint8Array) => {
            console.log("Image Sent to AI (Auto):", confirmation) // Server's acknowledgment
          }
        )

        console.log(
          "Final dataToSend for foodAiManual:",
          dataToSendFoodAiManual
        )
        socket.emit(
          "binaryData",
          dataToSendFoodAiManual,
          (confirmation: Uint8Array) => {
            console.log("Image Sent to AI (Manual):", confirmation) // Server's acknowledgment
          }
        )
      }

      img.src = imageUrl
    } catch (error) {
      console.error("Error handling upload:", error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-text"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-8 bg-white rounded-lg p-5">
            {/* Date */}
            <div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base">
                      บันทึกประจำวันที่
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="text-base">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal rounded-md",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-base">วว/ดด/ปป</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-white rounded-lg shadow-lg z-10"
                        align="start"
                      >
                        <Calendar
                          className="text-base"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Meal */}
            <div>
              <FormField
                control={form.control}
                name="mealTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">มื้ออาหาร</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="text-base">
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกมื้ออาหาร" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="text-base bg-white rounded-lg shadow-lg z-10">
                          <SelectItem value="มื้อเช้า">มื้อเช้า</SelectItem>
                          <SelectItem value="มื้อกลางวัน">
                            มื้อกลางวัน
                          </SelectItem>
                          <SelectItem value="มื้อเย็น">มื้อเย็น</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              {/* Food Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">ชื่ออาหาร</FormLabel>
                    <FormControl className="text-base">
                      <Input placeholder="กะเพรา" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              {/* Food Carb */}
              <FormField
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">คาร์บ</FormLabel>
                    <FormControl className="text-base">
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <ImageUploader onUpload={handleUploadWrapper} />
          {uploadedFiles && uploadedFiles.length > 0 && (
            <div>
              <h2>ไฟล์ของคุณ:</h2>
              <ul>
                {uploadedFiles.map((fileData, index) => (
                  <li key={index}>{fileData.name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col gap-2 ">
            <Button
              className="bg-secondary text-white w-full text-base rounded-md"
              type="submit"
            >
              บันทึก
            </Button>
            <Button
              variant={"outline"}
              className="border-secondary text-secondary w-full text-base rounded-md"
              onClick={unSubmit}
            >
              ยกเลิก
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

const addFood: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col bg-primary">
        <div className="flex flex-col gap-4">
          <h1 className="flex font-bold text-3xl justify-center text-text">
            บันทึกมื้ออาหารใหม่
          </h1>
          <FoodForm />
        </div>
      </MainLayout>
    </>
  )
}

export default addFood
