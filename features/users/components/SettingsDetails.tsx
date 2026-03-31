"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ControllerInput from "@/components/ui/inputs/ControllerInput"
import useUser from "@/features/users"
import { Shield, Trash2, Bell } from "lucide-react"

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const ChangePassword = () => {
  const { isLoading, handleChangePassword } = useUser()

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: z.infer<typeof passwordSchema>) => {
    handleChangePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
    form.reset()
  }

  return (
    <Card className="border border-gray-100">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <Shield size={16} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Change Password
            </h2>
            <p className="text-xs text-gray-400">
              Update your account password
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <ControllerInput
            name="oldPassword"
            form={form}
            label="Current Password"
            placeholder="••••••"
            type="password"
          />
          <ControllerInput
            name="newPassword"
            form={form}
            label="New Password"
            placeholder="••••••"
            type="password"
          />
          <ControllerInput
            name="confirmPassword"
            form={form}
            label="Confirm New Password"
            placeholder="••••••"
            type="password"
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export const Notifications = () => {
  const [emailNotifs, setEmailNotifs] = useState(true)

  return (
    <Card className="border border-gray-100">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
            <Bell size={16} className="text-amber-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Notifications
            </h2>
            <p className="text-xs text-gray-400">
              Manage your notification preferences
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Email Notifications
            </p>
            <p className="text-xs text-gray-400">
              Receive updates about your applications
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEmailNotifs(!emailNotifs)}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              emailNotifs ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 right-[23px] w-4 h-4 rounded-full bg-white shadow transition-transform ${
                emailNotifs ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          More notification options coming soon.
        </p>
      </CardContent>
    </Card>
  )
}

export const DeleteAccount = () => {
  const [confirm, setConfirm] = useState(false)

  return (
    <Card className="border border-red-100">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
            <Trash2 size={16} className="text-red-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Delete Account
            </h2>
            <p className="text-xs text-gray-400">
              Permanently delete your account and all data
            </p>
          </div>
        </div>

        {!confirm ? (
          <Button
            variant="outline"
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            onClick={() => setConfirm(true)}
          >
            Delete My Account
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-red-600 font-medium">
              Are you sure? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => {
                  // TODO: wire deleteUser thunk when backend is ready
                  alert("Delete account — coming soon")
                  setConfirm(false)
                }}
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

