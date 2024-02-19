import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const LoginForm = () => {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("Username: ", username)
    console.log("Password: ", password)
    router.push("/foodLog")
  }

  return (
    <div className="rounded-tl-3xl bg-white w-full flex justify-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-20 mt-8 text-center"> เข้าสู่ระบบ </h1>
        <label>
          <span>ชื่อผู้ใช้:</span>
          <input
            className="block mb-5 py-3 w-full text-gray-900 bg-transparent border-b-2 border-gray-300 dark:text-white dark:border-gray-600"
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
          />
        </label>
        <label>
          <span>รหัสผ่าน:</span>
          <input
            className="mb-5 py-3 w-full text-gray-900 bg-transparent border-b-2 border-gray-300 dark:text-white dark:border-gray-600"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </label>
        <button
          type="submit"
          className=" w-full mt-8 mb-20 align-baseline bg-secondary text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          เข้าสู่ระบบ
        </button>
        <p className="mt-4 mb-20 text-center">
          ยังไม่มีบัญชี?
          <Link href="/signup">
            {" "}
            <a className=" text-secondary hover:underline"> ลงทะเบียน </a>
          </Link>
        </p>
        <div className="flex justify-center">
          <div className="w-1/2 h-px bg-gray-400"></div>
        </div>
        <p className="mt-8 text-center">All rights reserves @KhaoNiew.co</p>
      </form>
    </div>
  )
}

export default LoginForm
