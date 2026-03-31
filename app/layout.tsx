"use client"
import Navbar from "@/components/layout/Navbar"
import React from "react"
import "./globals.css"
import Providers from "@/components/providers"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
