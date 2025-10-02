"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const divinputstyle = "m-0 mb-2 p-0 w-full flex flex-col justify-center items-start";
const obrigatorio = <span className="text-red-500 font-bold">*</span>;

interface FormInputProps {
    label: string;
    placeholder: string;
    required?: boolean;
    type?: string;
    maxLength?: number;
    disabled?: boolean;
    id?: string;
    name?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function FormInput({ id, name, label, placeholder, maxLength, type = "text", required = false, disabled = false, value, onChange, onBlur }: FormInputProps) {
  return (
    <div className={divinputstyle}>
      <Label htmlFor={id} className="mb-1">{label}{required && obrigatorio}</Label>
      <Input id={id} name={name} placeholder={placeholder} type={type} maxLength={maxLength} required={required} disabled={disabled} value={value} onChange={onChange} onBlur={onBlur} />
    </div>
  )
}