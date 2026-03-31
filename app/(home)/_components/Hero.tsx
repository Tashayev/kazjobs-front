import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {  Search} from "lucide-react"
import { useState } from "react"


const Hero = () => {
      const [search, setSearch] = useState("")
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <Badge className="mb-6 bg-blue-500/10 text-blue-300 border-blue-500/20 text-xs font-medium px-3 py-1">
            Kazakhstan&apos;s Job Platform 🇰🇿
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Find Your Next
            <span className="text-blue-400"> Opportunity</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
            Connect with top employers across Kazakhstan. Thousands of jobs
            waiting for the right candidate.
          </p>

          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, skill, or keyword..."
                className="pl-9 bg-white text-gray-900 border-0 h-11"
              />
            </div>
            <Link href={`/jobs${search ? `?q=${search}` : ""}`}>
              <Button className="h-11 px-6 bg-blue-500 hover:bg-blue-600">
                Search
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["React", "Node.js", "Almaty", "Remote", "Finance"].map((tag) => (
              <Link
                key={tag}
                href={`/jobs?q=${tag}`}
                className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1 rounded-full transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Hero