import { Props } from "./types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeDollarSign, Building2, CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"

const Body = ({ job, isSeeker, isOwner, isAuthenticated }: Props) => {
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Job Description
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {job?.description}
          </p>
        </div>

        {job?.skills && job.skills.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Card className="border border-gray-100 rounded-2xl">
          <CardContent className="p-6 space-y-4">
            {job?.salary && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                  <BadgeDollarSign size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Salary</p>
                  <p className="font-semibold text-gray-900">
                    ₸{job.salary.toLocaleString()}
                    <span className="text-xs text-gray-400 font-normal">
                      {" "}
                      /mo
                    </span>
                  </p>
                </div>
              </div>
            )}

            {job?.deadline && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                  <CalendarDays size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Deadline</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(job.deadline).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100">
              {isSeeker && !isOwner && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Apply Now
                </Button>
              )}
              {isOwner && (
                <Button variant="outline" className="w-full" disabled>
                  Your Job Post
                </Button>
              )}
              {!isAuthenticated && (
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-3">
                    Login to apply for this job
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/auth")}
                  >
                    Login / Register
                  </Button>
                </div>
              )}
              {isAuthenticated && !isSeeker && !isOwner && (
                <Button variant="outline" className="w-full" disabled>
                  Employers cannot apply
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        {job?.employer && (
          <Card className="border border-gray-100 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                About the Employer
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <Building2 size={14} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {job.employer.username}
                  </p>
                  <p className="text-xs text-gray-400">{job.employer.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Body
