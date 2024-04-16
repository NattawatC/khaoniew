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

interface AiProp {
  carbs: string
  foodName: string
  foodCertainty: number
  error: string[]
}

const mockDataFromAi = {
  carbs: 20.5,
  foodName: "อาหาร",
  foodCertainty: 0.643,
}

const formSchema = z.object({
  date: z.date(),
  mealTime: z.string(),
  name: z.string(),
  score: z.string(),
})

export function FoodForm() {
  const { setValue } = useForm()
  const router = useRouter()
  const [pixelArray, setPixelArray] = useState<number[][] | null>(null)
  const [foodName, setFoodName] = useState<string>("")
  const [foodCarbs, setFoodCarbs] = useState<string>("")
  const [showFields, setShowFields] = useState(false)
  const [foodNameValue, setFoodNameValue] = useState("")
  const [dataToSendFoodAiAuto, setDataToSendFoodAiAuto] = useState<Uint8Array>(
    new Uint8Array()
  )
  const [showManualInput, setShowManualInput] = useState(false)
  const [manualFoodName, setManualFoodName] = useState("")
  const [aiData, setAiData] = useState<AiProp | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
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

  //handle HAPPY Path
  const handleAuto = () => {
    setShowPopup(false)
    setShowFields(true)
    socket.off("fileChanged")
    socket.on("fileChanged", ({ content }) => {
      setAiData(content)
      setShowPopup(true)
    })
  }

  //handle SAD Path
  const handleManual = () => {
    setShowManualInput(false)
    // const foodAiManualHeader = new Uint8Array([1])
    // const foodNameByteArray = new TextEncoder().encode(manualFoodName || "")
    // const nameLengthByteArray = new Uint8Array([
    //   (foodNameByteArray.length >> 8) & 0xff,
    //   foodNameByteArray.length & 0xff,
    // ])
    // const dataToSendFoodAiManual = new Uint8Array(
    //   foodAiManualHeader.length +
    //     nameLengthByteArray.length +
    //     foodNameByteArray.length
    // )
    // dataToSendFoodAiManual.set(foodAiManualHeader)
    // let offsetManual = foodAiManualHeader.length
    // dataToSendFoodAiManual.set(nameLengthByteArray, offsetManual)
    // offsetManual += nameLengthByteArray.length
    // dataToSendFoodAiManual.set(foodNameByteArray, offsetManual)
    // console.log("Final dataToSend for foodAiManual:", dataToSendFoodAiManual)
    // socket.emit(
    //   "binaryData",
    //   dataToSendFoodAiManual,
    //   (confirmation: Uint8Array) => {
    //     console.log("Image Sent to AI (Manual):", confirmation) // Server's acknowledgment
    //   }
    // )
    mockDataFromAi.carbs = 0
    mockDataFromAi.foodName = manualFoodName
    setShowFields(true) // Show the food name and carbs fields
  }

  const handleUpload = async (files: File[]) => {
    try {
      //converting image to pixel array
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
        //convert image to bytearray
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
        const dataToSendFoodAiAutoInner = new Uint8Array(
          foodAiAutoHeader.length +
            heightByteArray.length +
            widthByteArray.length +
            uint8Array.length
        )
        dataToSendFoodAiAutoInner.set(foodAiAutoHeader)
        let offsetAuto = foodAiAutoHeader.length
        dataToSendFoodAiAutoInner.set(heightByteArray, offsetAuto)
        offsetAuto += heightByteArray.length
        dataToSendFoodAiAutoInner.set(widthByteArray, offsetAuto)
        offsetAuto += widthByteArray.length
        dataToSendFoodAiAutoInner.set(uint8Array, offsetAuto)

        //sending image to AI
        // socket.emit(
        //   "binaryData",
        //   dataToSendFoodAiAutoInner,
        //   (confirmation: Uint8Array) => {
        //     console.log("Image Sent to AI (Auto):", confirmation) // Server's acknowledgment
        //   }
        // )

        // socket.off("fileChanged")
        // socket.on("fileChanged", ({ content }) => {
        //   console.log({ content })
        //   setAiData(content)
        //   setValue("name", aiData?.foodName || "")
        //   setShowPopup(true)
        // })

        // console.log(
        //   "Final dataToSend for foodAiAuto:",
        //   dataToSendFoodAiAutoInner
        // )
        setShowPopup(true)
      }
      img.src = imageUrl
    } catch (error) {
      console.error("Error handling upload:", error)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // try {
    //   const response = await fetch(
    //     `http://localhost:4263/patients/${patientId}/meals`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         ...values,
    //         name: aiData?.foodName || "",
    //         score: aiData?.carbs || "",
    //       }),
    //     }
    //   )
    //   if (!response.ok) {
    //     throw new Error("Failed to create meal")
    //   }
    //   const resultData = await response.json()
    //   router.push({
    //     pathname: "/result",
    //     query: { data: JSON.stringify(resultData), score: aiData?.carbs },
    //   })
    // } catch (error) {
    //   console.error("Error creating meal:", error)
    // }

    try {
      const response = await fetch(
        `http://localhost:4263/patients/${patientId}/meals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            name: mockDataFromAi.foodName,
            score: mockDataFromAi.carbs,
          }),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to create meal")
      }
      const resultData = await response.json()
      router.push({
        pathname: "/result",
        query: {
          data: JSON.stringify(resultData),
          score: mockDataFromAi.carbs,
        },
      })
    } catch (error) {
      console.error("Error creating meal:", error)
    }
  }

  function unSubmit() {
    router.push("/foodLog")
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
            {showFields && (
              <>
                <div>
                  {/* Food Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">ชื่ออาหาร</FormLabel>
                        <FormControl className="text-base">
                          {/* <Input {...field} value={aiData?.foodName} /> */}
                          <Input {...field} value={mockDataFromAi.foodName} />
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
                          {/* <Input {...field} value={aiData?.carbs || ""} /> */}
                          <Input {...field} value={mockDataFromAi.carbs} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
          </div>
          <ImageUploader onUpload={handleUpload} />
          {uploadedFiles && uploadedFiles.length > 0 && (
            <div>
              <h2>ภาพอาหารของคุณ:</h2>
              <ul>
                {uploadedFiles.map((fileData, index) => (
                  <li key={index}>
                    {fileData.name}
                    <img
                      className="mt-4"
                      src={URL.createObjectURL(fileData)}
                      alt={fileData.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showPopup && (
            <div className="fixed inset-0">
              <div className="absolute inset-0 bg-white opacity-70 blur-lg"></div>
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg rounded-md p-6 z-10">
                <h2 className="text-center mb-2 text-secondary">
                  กรุณาตรวจสอบชื่ออาหาร
                </h2>
                {/* <ol>
                <li>ชื่ออาหาร: {aiData?.foodName ? aiData.foodName : ""}</li>
                <li>คาร์บ: {aiData?.carbs ? aiData.carbs + " (กรัม)" : ""}</li>
                <li className="mb-4">
                  ความมั่นใจผลประเมิน:{" "}
                  {aiData?.foodCertainty
                    ? aiData.foodCertainty * 100 + "%"
                    : ""}{" "}
                </li>
                </ol> */}
                <ol>
                  <li>
                    {"1. "}ชื่ออาหาร: {mockDataFromAi.foodName}
                  </li>
                  <li>
                    {"2. "}คาร์บ: {mockDataFromAi.carbs + " (กรัม)"}
                  </li>
                  <li className="mb-4">
                    {"3. "}ความมั่นใจผลประเมิน:{" "}
                    {mockDataFromAi.foodCertainty * 100 + "%"}
                  </li>
                </ol>
                <div className="flex flex-row gap-2">
                  <Button
                    variant={"outline"}
                    className="bg-secondary text-white w-full text-base rounded-md"
                    onClick={() => handleAuto()}
                  >
                    ยืนยัน
                  </Button>
                  <Button
                    variant={"outline"}
                    className="border-secondary text-secondary w-full text-base rounded-md"
                    onClick={() => {
                      setShowPopup(false)
                      setShowManualInput(true)
                    }}
                  >
                    ยกเลิก
                  </Button>
                </div>
              </div>
            </div>
          )}
          {showManualInput && (
            <div className="fixed inset-0">
              <div className="absolute inset-0 bg-white opacity-70 blur-lg"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-between rounded-md border border-input bg-white px-3 py-2 z-10">
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="manualFoodName">
                      กรุณาระบุชื่ออาหารที่ถูกต้อง
                    </label>
                    <input
                      className="border border-input rounded-md px-3 py-2"
                      type="text"
                      id="manualFoodName"
                      value={manualFoodName}
                      onChange={(e) => setManualFoodName(e.target.value)}
                    />
                    {uploadedFiles.map((fileData, index) => (
                      <div key={index}>
                        <img
                          className="mt-2"
                          src={URL.createObjectURL(fileData)}
                          alt={fileData.name}
                        />
                      </div>
                    ))}
                    <ol>
                      <li>
                        {"1. "}
                        จำนวนกำปั้นจะถูกประเมินโดยผู้เชี่ยวชาญในภายหลัง{" "}
                      </li>
                      <li>
                        {"2. "}
                        กรุฌาให้ความสนใจกับจำนวนกำปั้นที่เหลือในมื้อถัดไป{" "}
                      </li>
                    </ol>
                  </div>
                  <div className="flex flex-row gap-2 mt-4">
                    <Button
                      variant={"outline"}
                      className="bg-secondary text-white w-full text-base rounded-md"
                      onClick={() => handleManual()}
                    >
                      ยืนยัน
                    </Button>
                    <Button
                      variant={"outline"}
                      className="border-secondary text-secondary w-full text-base rounded-md"
                      onClick={() => setShowManualInput(false)}
                    >
                      ยกเลิก
                    </Button>
                  </div>
                </div>
              </div>
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
