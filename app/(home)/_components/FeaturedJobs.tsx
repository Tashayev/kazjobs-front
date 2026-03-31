import { Button } from '@/components/ui/button'
import JobCard from '@/features/jobs/components/JobCard'
import { Job } from '@/features/jobs/types'
import { ArrowRight, Briefcase } from 'lucide-react'
import Link from 'next/link'

type Props = {
  isLoading: boolean
  homeStage: Job[]
  
}
const FeaturedJobs = ({isLoading, homeStage}: Props) => {
  
  return (
    <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Latest Jobs</h2>
              <p className="text-sm text-gray-500 mt-1">
                Fresh opportunities this week
              </p>
            </div>
            <Link href="/jobs">
              <Button variant="outline" size="sm" className="gap-1">
                View all <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 rounded-xl bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : homeStage.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {homeStage.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Briefcase size={32} className="mx-auto mb-3 opacity-40" />
              <p>No jobs available yet.</p>
              <Link href="/auth">
                <Button variant="outline" size="sm" className="mt-4">
                  Post a job
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
  )
}

export default FeaturedJobs