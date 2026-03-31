import { Button } from "@/components/ui/button"
import Link from "next/link"

const Banner = ({ role }: { role: string }) => {
  return (
    <section className="bg-blue-600 text-white">
      <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
          <p className="text-blue-100 text-sm">
            Join thousands of professionals already using KazJobs.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          {role === "seeker" ? (
            <Link href="/auth">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-medium">
                Find a Job
              </Button>
            </Link>
          ) : (
            <Link href="/profile/create-job">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Post a Job
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default Banner
