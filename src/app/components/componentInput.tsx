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
    textOnly?: boolean;
    mask?: 'phone';
}

export function FormInput({ id, name, label, placeholder, maxLength, type = "text", required = false, disabled = false, value, onChange, onBlur, textOnly = false, mask }: FormInputProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    if (textOnly) {
      value = value.replace(/[0-9]/g, '').toUpperCase();
    }

    if (mask === 'phone') {
      value = value.replace(/\D/g, '');
      if (value.length > 11) {
        value = value.substring(0, 11);
      }
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }

    e.target.value = value;
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={divinputstyle}>
      <Label>{label}{required && obrigatorio}</Label>
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        maxLength={mask === 'phone' ? 15 : maxLength}
        required={required}
        disabled={disabled}
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
      />
    </div>
  )
}