"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { z } from "zod"

import cloche from "@/assets/cloche.png"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NextPage } from "next"
import Link from "next/link"
import { useState } from "react"

const formSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  age: z.string(),
  gender: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  medicalCondition: z.array(z.string()).optional(),
  thaiId: z.string(),
  password: z.string(),
})

const genderOptions = [
  { label: "-", value: "-" },
  { label: "ชาย", value: "ชาย" },
  { label: "หญิง", value: "หญิง" },
  { label: "อื่นๆ", value: "อื่นๆ" },
]

export function SignupForm() {
  const router = useRouter()
  const [medicalConditions, setMedicalConditions] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      age: "",
      gender: "-",
      address: "",
      phoneNumber: "",
      medicalCondition: [],
      thaiId: "",
      password: "",
    },
  })

  formSchema.shape

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // remove "-" from phoneNumber and thaiId
    const cleanedValues = {
      ...values,
      phoneNumber: values.phoneNumber.replace(/-/g, ""),
      thaiId: values.thaiId.replace(/-/g, ""),
    }

    // allow empty medical condition field
    // const filteredValues = {
    //   ...cleanedValues,
    //   medicalCondition:
    //     cleanedValues.medicalCondition &&
    //     cleanedValues.medicalCondition.length > 0
    //       ? cleanedValues.medicalCondition
    //       : undefined,
    // }
    console.log(values)

    try {
      const response = await fetch("http://localhost:4263/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        // Handle success response
        console.log("Data sent successfully")
        router.push("/login")
      } else {
        // Handle error response
        console.error("Failed to send data")
      }
    } catch (error) {
      // Handle network error
      console.error("Error sending data:", error)
    }
  }

  return (
    <Form {...form}>
      <div className="rounded-tl-[80px] bg-white w-full flex justify-center pt-20 pb-8">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-3/4"
        >
          <h1 className="text-4xl text-center font-bold text-text">
            {" "}
            สร้างบัญชีผู้ใช้{" "}
          </h1>
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-text">ชื่อจริง:</FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    placeholder="ทักษิณ"
                    type="text"
                    required
                    aria-label="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-text">นามสกุล:</FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    placeholder="ชินวัตร"
                    type="text"
                    required
                    aria-label="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-text">อายุ:</FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    placeholder="xx"
                    type="text"
                    required
                    aria-label="Age"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-text">เพศ:</FormLabel>
                <FormControl>
                  <select
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    {...field}
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-text">ที่อยู่:</FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    placeholder="ที่อยู่อาศัยปัจจุบัน"
                    type="text"
                    required
                    aria-label="Age"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-text">
                  เบอร์โทรติดต่อ:
                </FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    placeholder="xxx-xxx-xxxx"
                    type="text"
                    required
                    aria-label="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medicalCondition"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-text">
                  โรคประจำตัว:
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    placeholder="โรคหัวใจ, เบาหวาน"
                    type="text"
                    aria-label="Medical Conditions"
                    {...field}
                    onChange={(e) => {
                      const medicalConditions = e.target.value
                        .split(",")
                        .map((condition) => condition.trim())
                      setMedicalConditions(medicalConditions)
                      field.onChange(medicalConditions)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thaiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-text">
                  รหัสบัตรประชาชน:
                </FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    placeholder="xxx-xxxx-xxxxxx"
                    type="text"
                    required
                    aria-label="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base text-text">รหัสผ่าน:</FormLabel>
                <FormControl>
                  <Input
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    placeholder="********"
                    required
                    type="password"
                    aria-label="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-secondary rounded-md w-full text-white text-base"
            type="submit"
          >
            ตรวจสอบ
          </Button>
          <div className="text-center text-base">
            <Link href="/login">
              มีบัญชีอยู่แล้ว?
              <span className="text-secondary hover:underline">
                {" "}
                ลงชื่อเข้าใช้
              </span>
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="w-1/2 h-px bg-gray-400"></div>
          </div>
          <p className="text-base align-bottom text-center">
            All rights reserves @KhaoNiew.co
          </p>
        </form>
      </div>
    </Form>
  )
}

const signup: NextPage = () => {
  return (
    <>
      <div className="flex flex-col gap-2 bg-primary">
        <div className="flex flex-col items-center">
          <Image
            className="h-1/3 w-1/3 mt-12 mb-12"
            src={cloche}
            alt="Cloche"
          />
        </div>
        <SignupForm />
      </div>
    </>
  )
}
export default signup
