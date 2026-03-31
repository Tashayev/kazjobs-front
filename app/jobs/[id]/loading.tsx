import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Skeleton className="h-6 w-32 mb-8" />
      <Skeleton className="h-10 w-2/3 mb-4" />
      <Skeleton className="h-4 w-1/3 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  )
}