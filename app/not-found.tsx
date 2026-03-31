"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
          <FileQuestion size={36} className="text-blue-400" />
        </div>

        {/* Number */}
        <h1 className="text-7xl font-bold text-gray-900 tracking-tight mb-2">
          404
        </h1>

        {/* Text */}
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Page not found
        </h2>
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Go back
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/")}
          >
            Home
          </Button>
        </div>

      </div>
    </div>
  )
}