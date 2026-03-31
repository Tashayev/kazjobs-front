"use client"

import { useJobs } from "@/features/jobs"
import useUser from "@/features/users"
import { notFound, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import BackBtn from "@/components/ui/buttons/BackBtn"
import Header from "@/app/jobs/[id]/_components/Header"
import Body from "@/app/jobs/[id]/_components/Body"
import Loading from "@/app/jobs/[id]/loading"

const JobDetail = () => {
  const { id } = useParams()
  const {
    selectedJob: job,
    selectedJobLoading,
    handleFetchJobById,
    clearSelectedJob,
  } = useJobs()
  const { isAuthenticated, user } = useUser()

  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    clearSelectedJob()
    if (id) {
      handleFetchJobById(id as string).finally(() => setHasFetched(true))
    }
  }, [id])

  useEffect(() => {
    if (hasFetched && !selectedJobLoading && !job) notFound()
  }, [hasFetched, selectedJobLoading, job])

  const isSeeker = isAuthenticated && user?.role === "seeker"
  const isOwner = user?.email === job?.employer?.email
  if (selectedJobLoading) {
    return <Loading />
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <BackBtn />
        <Header job={job} />
        <Body
          job={job}
          isSeeker={isSeeker}
          isOwner={isOwner}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  )
}

export default JobDetail
