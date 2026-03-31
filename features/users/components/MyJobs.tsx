"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useJobs } from "@/features/jobs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Pencil, Trash2, Users } from "lucide-react"
import { TYPE_COLORS } from "@/constants"

const MyJobs = () => {
  const { jobs, isLoading, handleGetJobsByEmployer, handleDeleteJob } = useJobs()
  const router = useRouter()

  useEffect(() => {
    handleGetJobsByEmployer()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <Card className="border border-gray-100">
        <CardContent className="p-10 text-center text-gray-400">
          <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
          <p className="mb-4">You haven&apos;t posted any jobs yet.</p>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/profile/create-job")}
          >
            Post Your First Job
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <Card
          key={job._id}
          className="border border-gray-100 hover:border-blue-200 transition-all"
        >
          <CardContent className="p-5 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
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
              <div className="flex flex-wrap gap-3 text-xs text-gray-400">
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
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-xs"
                onClick={() =>
                  router.push(`/profile/applicants/${job._id}`)
                }
              >
                <Users size={14} />
                Applicants
              </Button>
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
                onClick={() =>
                  router.push(`/profile/edit-job/${job._id}`)
                }
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
  )
}

export default MyJobs