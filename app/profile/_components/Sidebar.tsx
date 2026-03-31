"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, UserCircle, Settings, Briefcase } from "lucide-react"
import useUser from "@/features/users"

const EMPLOYER_ITEMS = [
  { title: "Personal Info", icon: UserCircle, path: "personal" },
  { title: "Create Job", icon: FileText, path: "create-job" },
  { title: "My Jobs", icon: Briefcase, path: "my-jobs" },
  { title: "Settings", icon: Settings, path: "settings" },
]

const SEEKER_ITEMS = [
  { title: "Personal Info", icon: UserCircle, path: "personal" },
  { title: "Settings", icon: Settings, path: "settings" },
]

const Sidebar = () => {
  const pathname = usePathname()
  const { user } = useUser()

  const items = user?.role === "employer" ? EMPLOYER_ITEMS : SEEKER_ITEMS

  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-100 px-3 py-6 shrink-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-4">
        Profile
      </p>
      <nav className="flex flex-col gap-1">
        {items.map(({ title, icon: Icon, path }) => {
          const isActive = pathname.includes(path)
          return (
            <Link
              key={path}
              href={`/profile/${path}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800",
              )}
            >
              <Icon size={16} className={isActive ? "text-blue-600" : "text-gray-400"} />
              {title}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 max-w-4xl">
        {children}
      </main>
    </div>
  )
}

export default ProfileLayout