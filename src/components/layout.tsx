import { cn } from "@/lib/utils"
import React, { ComponentProps } from "react"

export const MainLayout: React.FunctionComponent<ComponentProps<"main">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <main
      className={cn(
        className,
        "min-h-screen mx-auto w-full max-w-md px-4 py-6 md:py-24"
      )}
      {...props}
    >
      {children}
    </main>
  )
}
