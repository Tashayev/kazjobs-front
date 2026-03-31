"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RegisterForm from "../../../features/users/components/RegisterForm"
import LoginForm from "../../../features/users/components/LoginForm"

const AuthTabs = () => {
  return (
    <Tabs defaultValue="register" className="w-[400px] flex flex-col gap-4 bg-gray-50 p-5 rounded-lg">
      <TabsList variant="line" className="flex justify-around w-full">
        <TabsTrigger value="register" className="[&[data-active]]:text-blue-500 text-lg uppercase">
          Register form
        </TabsTrigger>
        <TabsTrigger value="login" className="[&[data-active]]:text-blue-500 text-lg uppercase">
          Login form
        </TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
    </Tabs>
  )
}

export default AuthTabs
