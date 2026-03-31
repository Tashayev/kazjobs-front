import {
  Controller,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../field"
import { Input } from "../input"

type Prop<T extends FieldValues> = {
  name: Path<T>
  form: UseFormReturn<T>
  label: string
  placeholder?: string
  description?: string
  type?: string
}

const ControllerInput = <T extends FieldValues>({
  name,
  form,
  label,
  placeholder,
  description,
  type = "text",
}: Prop<T>) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            id={field.name}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError>{fieldState.error?.message}</FieldError>}
        </Field>
      )}
    />
  )
}

export default ControllerInput
