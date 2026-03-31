import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Briefcase,
 
  Clock,
 
} from "lucide-react"
import { Job } from "../types"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { TYPE_COLORS } from "@/constants"
const JobCard = ({ job }: { job: Job }) => (
  <Link href={`/jobs/${job._id}`}>
    <Card className="group h-full border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200">
      <CardContent className="p-5 flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between gap-2">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Briefcase size={18} className="text-blue-600" />
          </div>
          {job.type && (
            <Badge
              className={`text-xs font-medium ${TYPE_COLORS[job.type] ?? "bg-gray-100 text-gray-600"}`}
              variant="outline"
            >
              {job.type}
            </Badge>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {job.title}
          </h3>
          {job.employer && (
            <p className="text-sm text-gray-500 mt-0.5">{job.employer.username}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {job.location && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} />
              {job.location}
            </span>
          )}
          {job.salary && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">
                ₸{job.salary.toLocaleString()}
              </span>
              /mo
            </span>
          )}
          {job.deadline && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={12} />
              {new Date(job.deadline).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </span>
          )}
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {s}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs text-gray-400">+{job.skills.length - 3}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  </Link>
)

export default JobCard

