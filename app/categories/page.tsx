import { CATEGORIES } from '@/constants'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const CategoriesPage = () => {
  return (
     <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Browse Categories
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find roles in your field
            </p>
          </div>
          
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CATEGORIES.map(({ label, icon: Icon, count }) => (
            <Link key={label} href={`/jobs?category=${label.toLowerCase()}`}>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{count} jobs</p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto text-gray-300 group-hover:text-blue-500 transition-colors"
                />
              </div>
            </Link>
          ))}
        </div>
     </div>
  )
}

export default CategoriesPage