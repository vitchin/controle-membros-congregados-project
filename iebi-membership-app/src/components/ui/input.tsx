import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base
        "flex w-full h-12 rounded-md border bg-transparent px-3 py-1 text-base shadow-md outline-none transition-all",
        // Cores base e variantes
        "border-[#9d3726] text-[#9d3726] placeholder:text-[#b0432f] bg-white focus-visible:border-[#9d3726] dark:bg-[#2d1813] dark:border-[#9d3726] dark:text-[#f5e6e2] dark:placeholder:text-[#e2c2b8]",
        // Disabled
        "disabled:pointer-events-none disabled:select-none disabled:cursor-not-allowed disabled:opacity-55 disabled:text-[#ccc] disabled:placeholder:text-[#ccc]",
        // Aria-invalid
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
