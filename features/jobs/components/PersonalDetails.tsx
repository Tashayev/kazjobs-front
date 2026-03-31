"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ControllerInput from "@/components/ui/inputs/ControllerInput"
import useUser from "@/features/users"

const formSchema = z.object({
  username: z.string().min(1).max(30),
  role: z.enum(["seeker", "employer"]),
})

const PersonalDetails = () => {
  const { user, isLoading, handleUpdateProfile } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      role: "seeker",
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        role: user.role,
      })
    }
  }, [user, form])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    handleUpdateProfile(data)
  }

  return (
    <div className="space-y-6">
    
      <Card className="border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              {user?.username?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user?.username}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <Badge
                className="mt-1 text-xs"
                variant="outline"
              >
                {user?.role}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit form */}
      <Card className="border border-gray-100">
        <CardContent className="p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-6">
            Edit Information
          </h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ControllerInput
              name="username"
              form={form}
              label="Username"
              placeholder="your username"
            />
            <ControllerInput
              name="role"
              form={form}
              label="Role"
              placeholder="your role"
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PersonalDetails