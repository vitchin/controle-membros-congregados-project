"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const divinputstyle = "m-0 p-0 w-full flex flex-col justify-center items-start";
const obrigatorio = <span className="text-red-500 font-bold">*</span>;

interface FormInputProps {
    label: string
    placeholder: string
    required?: boolean
    type?: string
    maxLength?: number
    disabled?: boolean
    id?: string
}

export function FormInput({ id, label, placeholder, maxLength, type = "text", required = false, disabled = false}: FormInputProps) {
  return (
    <div className={divinputstyle}>
      <Label>{label}{required && obrigatorio}</Label>
      <Input id={id} placeholder={placeholder} type={type} maxLength={maxLength} required={required} disabled={disabled} />
    </div>
  )
}