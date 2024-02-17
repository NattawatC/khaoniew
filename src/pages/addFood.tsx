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
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  dob: z.date(),
  meal: z.string(),
  food: z.string(),
})

export function FoodForm() {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meal: "",
      food: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                name="dob"
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
                              "w-full pl-3 text-left font-normal",
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
                name="meal"
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
                name="food"
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
          </div>

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
