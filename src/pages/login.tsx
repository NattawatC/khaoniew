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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
})

export function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    try {
      console.log(values)
      const response = await fetch("http://localhost:4263/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send the user object from the form values
      })
      if (!response.ok) {
        throw new Error("Login failed")
      }
      const data = await response.json()
      if (data.userType == "staff") {
        router.push("/patient")
      }
      else{
        router.push("/foodLog")
      }
    } catch (error) {
      setError("Invalid username or password")
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
            เข้าสู่ระบบ{" "}
          </h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-text">
                  ชื่อผู้ใช้:
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-0 rounded-none text-text bg-transparent border-b-2 border-secondary pl-1 ring-transparent text-base"
                    placeholder="Vega Chao"
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
            className="bg-secondary rounded-md w-full text-white"
            type="submit"
          >
            เข้าสู่ระบบ
          </Button>
          <div className="text-center">
            <Link href="/signup">
              ยังไม่มีบัญชี?{" "}
              <span className="text-secondary hover:underline">ลงทะเบียน</span>
            </Link>
          </div>
          {/* <div className="flex justify-center">
            <div className="w-1/2 h-px bg-gray-400"></div>
          </div>
          <p className=" align-bottom text-center">
            All rights reserves @KhaoNiew.co
          </p> */}
        </form>
      </div>
    </Form>
  )
}

const login: NextPage = () => {
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
        <LoginForm />
      </div>
    </>
  )
}
export default login
function setError(arg0: string) {
  throw new Error("Function not implemented.")
}
