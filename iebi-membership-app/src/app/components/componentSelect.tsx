// components/FormSelect.tsx
"use client"

import { Label } from "@/components/ui/label"
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select"


const divinputstyle = "m-0 p-0 w-full flex flex-col justify-center items-start";
const obrigatorio = <span className="text-red-500 font-bold">*</span>;

interface FormSelectProps {
    label: string
    placeholder: string
    required?: boolean
    options: { label: string, value: string }[]
    disabled?: boolean
    id?: string
}

export function FormSelect({
  id, label, placeholder, options, required = false, disabled = false
}: FormSelectProps) {
  return (
    <div className={divinputstyle}>
      <Label>{label}{required && obrigatorio}</Label>
      <Select disabled={disabled}>
        <SelectTrigger className="w-full" id={id} disabled={disabled}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
