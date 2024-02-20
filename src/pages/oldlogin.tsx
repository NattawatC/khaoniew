import LoginForm from "@/components/LoginForm"
import { MainLayout } from "@/components/layout"
import React from "react"
import { FaBowlFood } from "react-icons/fa6"

const login = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-start min-h-screen bg-primary">
        <FaBowlFood className="text-yellow-950 text-8xl mt-20 mb-20" />
        <LoginForm />
      </div>
    </MainLayout>
  )
}

export default login
