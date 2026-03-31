"use client"
import { Field, FieldGroup, FieldSet, FieldLabel } from "@/components/ui/field"
import SelectBtn from "@/components/ui/buttons/SelectBtn"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import * as z from "zod"
import ControllerInput from "@/components/ui/inputs/ControllerInput"
import useUser from ".."

const formSchema = z
  .object({
    email: z.email("Invalid email."),
    username: z.string().min(1).max(30),
    password: z.string().min(6),
    conPassword: z.string().min(6),
    role: z.enum(["seeker", "employer"]),
  })
  .refine((data) => data.password === data.conPassword, {
    message: "Passwords don't match",
    path: ["conPassword"],
  })

const RegisterForm = () => {
  const { handleRegister } = useUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      conPassword: "",
      role: "seeker",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { conPassword: _, ...rest } = data
    handleRegister(rest)
  }
  const role = useWatch({
    control: form.control,
    name: "role",
  })
  return (
    <FieldSet className="w-full">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-4">
          <ControllerInput
            name="email"
            form={form}
            label="Email"
            placeholder="example@email.com"
          />
          <ControllerInput
            name="username"
            form={form}
            label="Username"
            placeholder="Max Leiter"
          />
          <Field>
            <FieldLabel>I am a</FieldLabel>
            <div className="flex gap-2">
              <SelectBtn
                value={role}
                onClick={() => form.setValue("role", "seeker")}
                label="Job Seeker"
                isSelected={role === "seeker"}
              />
              <SelectBtn
                value={role}
                onClick={() => form.setValue("role", "employer")}
                label="Employer"
                isSelected={role === "employer"}
              />
            </div>
          </Field>

          <ControllerInput
            name="password"
            form={form}
            label="Password"
            placeholder="••••••"
            type="password"
          />
          <ControllerInput
            name="conPassword"
            form={form}
            label="Confirm password"
            placeholder="••••••"
            type="password"
          />

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Register
          </button>
        </FieldGroup>
      </form>
    </FieldSet>
  )
}

export default RegisterForm
