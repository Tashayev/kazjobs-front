"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import {
  FileText,
  UserCircle,
  Briefcase,
  Settings as SettingsIcon,
} from "lucide-react"
import PersonalDetails from "../../../features/jobs/components/PersonalDetails"
import CreateJobs from "../../../features/jobs/components/CreateJobs"
import MyJobs from "@/features/users/components/MyJobs"
import Settings from "../_components/Settings"

const SECTIONS = [
  {
    title: "Personal Information",
    icon: UserCircle,
    path: "personal",
    component: <PersonalDetails />,
  },
  {
    title: "Create Job",
    icon: FileText,
    path: "create-job",
    component: <CreateJobs />,
  },
  {
    title: "My Jobs",
    icon: Briefcase,
    path: "my-jobs",
    component: <MyJobs />,
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    path: "settings",
    component: <Settings />,
  },
]

const SectionPage = ({ params }: { params: Promise<{ section: string }> }) => {
  const { section } = use(params)
  const item = SECTIONS.find((i) => i.path === section)
  if (!item) return notFound()

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <item.icon size={18} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{item.title}</h1>
          <p className="text-sm text-gray-400">
            Manage your {item.title.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Section content */}
      {item.component}
    </div>
  )
}

export default SectionPage
