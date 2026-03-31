"use client"
import Navbar from "@/components/layout/Navbar"
import React from "react"
import "./globals.css"
import AuthProvider from "@/components/hooks/AuthProvider"
import { Provider } from "react-redux"
import { store } from "@/store"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}
