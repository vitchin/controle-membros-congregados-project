// components/FormCheckbox.tsx
"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FormCheckboxProps {
  label: string
  checked?: boolean // para uso controlado
  defaultChecked?: boolean // para uso não-controlado
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
  className?: string // para estender estilos externos
}

export function FormCheckbox({
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  id,
  className = "",
}: FormCheckboxProps) {
  const internalId = React.useId()
  const inputId = id ?? `form-checkbox-${internalId}`

  return (
    <div className={`flex items-center gap-2 m-0 p-0 ${className}`}>
      <Checkbox
        id={inputId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(val) => {
          // val pode ser "indeterminate" em alguns casos; normalize para boolean
          if (typeof val === "boolean" && onCheckedChange) {
            onCheckedChange(val)
          }
        }}
        disabled={disabled}
        className="m-0 p-0 w-6 h-6"
      />
      <Label htmlFor={inputId} className="cursor-pointer m-0">
        {label}
      </Label>
    </div>
  )
}
