"use client"

import { useEffect, useState } from "react"
import { useJobs } from "@/features/jobs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Briefcase, Clock, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { JOB_TYPES, JOB_CATEGORIES, TYPE_COLORS, KZ_CITIES } from "@/constants"
import { cn } from "@/lib/utils"

const JobsPage = () => {
  const { jobs, isLoading, handleFetchJobs } = useJobs()

  const [search, setSearch] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // fetch with filters
  useEffect(() => {
    handleFetchJobs({
      type: selectedType || undefined,
      category: selectedCategory || undefined,
      location: selectedCity || undefined,
    })
  }, [selectedType, selectedCategory, selectedCity])

  // client side search filter
  const filtered = jobs.filter((job) =>
    search
      ? job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.skills?.some((s) => s.toLowerCase().includes(search.toLowerCase()))
      : true,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Find Jobs</h1>
          <p className="text-sm text-gray-400 mt-1">
            {filtered.length} jobs available
          </p>
        </div>

        {/* Search + filter toggle */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or skill..."
              className="pl-9 bg-white"
            />
          </div>
          <Button
            variant="outline"
            className={cn("gap-2", showFilters && "border-blue-500 text-blue-600")}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} />
            Filters
            {(selectedType || selectedCategory || selectedCity) && (
              <span className="w-2 h-2 rounded-full bg-blue-600" />
            )}
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6 space-y-4">

            {/* Type */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Type
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType("")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm border transition-all",
                    !selectedType
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-600 border-gray-200 hover:border-blue-300",
                  )}
                >
                  All
                </button>
                {JOB_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedType(t.value === selectedType ? "" : t.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm border transition-all",
                      selectedType === t.value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-600 border-gray-200 hover:border-blue-300",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                City
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCity("")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm border transition-all",
                    !selectedCity
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-600 border-gray-200 hover:border-blue-300",
                  )}
                >
                  All
                </button>
                {KZ_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city === selectedCity ? "" : city)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm border transition-all",
                      selectedCity === city
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-600 border-gray-200 hover:border-blue-300",
                    )}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm border transition-all",
                    !selectedCategory
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-600 border-gray-200 hover:border-blue-300",
                  )}
                >
                  All
                </button>
                {JOB_CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() =>
                      setSelectedCategory(c.value === selectedCategory ? "" : c.value)
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm border transition-all",
                      selectedCategory === c.value
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-600 border-gray-200 hover:border-blue-300",
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(selectedType || selectedCategory || selectedCity) && (
              <button
                onClick={() => {
                  setSelectedType("")
                  setSelectedCategory("")
                  setSelectedCity("")
                }}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Jobs */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
            <p>No jobs found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((job) => (
              <Link key={job._id} href={`/jobs/${job._id}`}>
                <Card className="border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
                  <CardContent className="p-5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Briefcase size={16} className="text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-gray-900 truncate">
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
                        {job.employer && (
                          <p className="text-sm text-gray-500 mb-2">
                            {job.employer.username}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {job.location}
                            </span>
                          )}
                          {job.deadline && (
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {new Date(job.deadline).toLocaleDateString(
                                "en-GB",
                                { day: "numeric", month: "short" },
                              )}
                            </span>
                          )}
                        </div>
                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.skills.slice(0, 4).map((s) => (
                              <span
                                key={s}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {job.salary && (
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-gray-900 text-sm">
                          ₸{job.salary.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">/mo</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JobsPage