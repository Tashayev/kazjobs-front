"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const navigations = [
  { label: "Find Job", path: "/jobs" },
  { label: "Categories", path: "/categories" },
]

const Navbar = () => {
  const pathname = usePathname()
  const isAuth = false
  return (
    <header className="bg-white border-b fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex gap-10">
          <Link href="/" className="font-bold text-xl">
            Kaz<span className="text-blue-600">Jobs</span>
          </Link>
          <nav className="flex items-center gap-1">
            {navigations.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} />
            <span className="cursor-default">+702 811 44 30</span>
          </div>
          {isAuth ? (
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <>
              <Link
                href="/auth"
                className="bg-blue-500 text-white rounded-md px-3 py-1.5 text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
