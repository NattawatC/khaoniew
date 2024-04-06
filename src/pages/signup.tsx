"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { ZodNull, ZodNullable, number, z } from "zod"

import cloche from "@/assets/cloche.png"
import { MainLayout } from "@/components/layout"
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
  firstname: z.string(),
  lastname: z.string(),
  age: z.string(),
  medicalcondition: z.string(),
  thaiId: z.string(),
  password: z.string(),
})

export function SignupForm() {
  const router = useRouter()
  //   const [username, setUsername] = useState("")
  //   const [password, setPassword] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      age: "",
      medicalcondition: "",
      thaiId: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    router.push("/login")
    console.log(values)
  }

  return (
    <Form {...form}>
      <div className="rounded-tl-3xl bg-white w-full flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-3/4"
        >
          <h1 className="text-4xl mb-20 mt-8 text-center">
            {" "}
            สร้างบัญชีผู้ใช้{" "}
          </h1>
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อจริง:</FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="py-0 px-0 border-0 rounded-none text-black bg-transparent border-b-2 border-black dark:text-white dark:border-black"
                    placeholder=""
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
                <FormLabel>นามสกุล:</FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="py-0 px-0 border-0 rounded-none text-black bg-transparent border-b-2 border-black dark:text-white dark:border-black"
                    placeholder=""
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
                <FormLabel>อายุ:</FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="py-0 px-0 border-0 rounded-none text-black bg-transparent border-b-2 border-black dark:text-white dark:border-black"
                    placeholder=""
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
            name="medicalcondition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>โรคประจำตัว:</FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="py-0 px-0 border-0 rounded-none text-black bg-transparent border-b-2 border-black dark:text-white dark:border-black"
                    placeholder=""
                    type="text"
                    aria-label="Medical Conditions"
                    {...field}
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
                <FormLabel>รหัสบัตรประชาชน:</FormLabel>
                <FormControl>
                  <Input
                    /* py-0, px-0, border-0,rounded-none for figma lookalike */
                    className="py-0 px-0 border-0 rounded-none text-black bg-transparent border-b-2 border-black dark:text-white dark:border-black"
                    placeholder=""
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
                <FormLabel>รหัสผ่าน:</FormLabel>
                <FormControl>
                  <Input
                    className="py-0 px-0 border-0 rounded-none text-black bg-transparent border-b-2 border-black dark:text-white dark:border-black"
                    placeholder=""
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
          <p className=" align-bottom text-center">
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
      <MainLayout>
        <div className="flex flex-col items-center justify-start min-h-screen bg-primary">
          <Image
            className="h-1/3 w-1/3 mt-20 mb-20"
            src={cloche}
            alt="Cloche"
          />
          <SignupForm />
        </div>
      </MainLayout>
    </>
  )
}
export default signup
