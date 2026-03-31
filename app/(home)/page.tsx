"use client"

import Hero from "./_components/Hero"
import Stats from "./_components/Stars"
import Categories from "./_components/Categories"
import FeaturedJobs from "./_components/FeaturedJobs"
import HowItWorks from "./_components/HowItWorks"
import Banner from "./_components/Banner"
import { useJobs } from "@/features/jobs"
import useUser from "@/features/users"


const Home = () => {
   const { isLoading, homeStage } = useJobs()
   const {user} = useUser()
   const role = user?.role ?? "seeker"
  
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Categories />
      <FeaturedJobs isLoading={isLoading} homeStage={homeStage} />
      <HowItWorks />
      <Banner role={role} />
    </div>
  )
}

export default Home
