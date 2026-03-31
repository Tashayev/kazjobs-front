import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const BackBtn = () => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8"
    >
      <ChevronLeft size={16} />
      Back to jobs
    </button>
  )
}

export default BackBtn
