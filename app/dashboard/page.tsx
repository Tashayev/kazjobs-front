"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useUser from "@/features/users"
import { useJobs } from "@/features/jobs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Clock, Plus, Trash2, Pencil } from "lucide-react"
import Link from "next/link"
import { TYPE_COLORS } from "@/constants"

const DashboardPage = () => {
  const { user, isAuthenticated } = useUser()
  const { jobs, isLoading, handleGetJobsByEmployer, handleDeleteJob } =
    useJobs()
  const router = useRouter()

  const isEmployer = user?.role === "employer"

  useEffect(() => {
    if (isAuthenticated && isEmployer) {
      handleGetJobsByEmployer()
    }
  }, [isAuthenticated, isEmployer])

  if (!isAuthenticated) return null

  // ── Seeker Dashboard ──────────────────────────────────────────────────────
  if (!isEmployer) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-sm text-gray-400 mb-8">Track your applications</p>
        <Card className="border border-gray-100">
          <CardContent className="p-6 text-center text-gray-400">
            <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
            <p>No applications yet.</p>
            <Link href="/jobs">
              <Button variant="outline" size="sm" className="mt-4">
                Browse Jobs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Employer Dashboard ────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back, {user?.username}
          </p>
        </div>
        <Link href="/profile/create-job">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus size={16} />
            Post Job
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Jobs", value: jobs.length, icon: Briefcase },
          { label: "Active Jobs", value: jobs.length, icon: Clock },
          { label: "Applicants", value: "—", icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border border-gray-100">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Icon size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jobs list */}
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Your Posted Jobs
      </h2>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <Card className="border border-gray-100">
          <CardContent className="p-8 text-center text-gray-400">
            <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
            <p>No jobs posted yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <Card
              key={job._id}
              className="border border-gray-100 hover:border-blue-200 transition-all"
            >
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {job.title}
                    </h3>
                    {job.type && (
                      <Badge
                        variant="outline"
                        className={`text-xs shrink-0 ${TYPE_COLORS[job.type] ?? ""}`}
                      >
                        {job.type}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {job.location && <span>{job.location}</span>}
                    {job.salary && (
                      <span>₸{job.salary.toLocaleString()}/mo</span>
                    )}
                    {job.deadline && (
                      <span>
                        Deadline:{" "}
                        {new Date(job.deadline).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/jobs/${job._id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/profile/edit-job/${job._id}`)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:border-red-200"
                    onClick={() => handleDeleteJob(job._id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardPage
