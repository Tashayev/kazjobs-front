import { Badge } from "@/components/ui/badge"
import { TYPE_COLORS } from "@/constants"
import { Building2, Clock, MapPin } from "lucide-react"
import { Props } from "./types"

const Header = ({job}: Props) => {

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Building2 size={24} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job?.title}</h1>
            {job?.employer && (
              <p className="text-gray-500 mt-1">{job.employer.username}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              {job?.location && (
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin size={14} />
                  {job.location}
                </span>
              )}
              {job?.type && (
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${TYPE_COLORS[job.type] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {job.type}
                </Badge>
              )}
              {job?.createdAt && (
                <span className="flex items-center gap-1 text-sm text-gray-400">
                  <Clock size={14} />
                  Posted{" "}
                  {new Date(job.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
