"use client"

import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ControllerInput from "@/components/ui/inputs/ControllerInput"
import SelectBtn from "@/components/ui/buttons/SelectBtn"
import { Field, FieldLabel } from "@/components/ui/field"
import { JOB_TYPES, JOB_CATEGORIES } from "@/constants"
import { useJobs } from "@/features/jobs"

const formSchema = z.object({
  title: z.string().min(3).max(30),
  description: z.string().min(5).max(1000),
  location: z.string().optional(),
  salary: z.string().optional(),
  type: z.enum(["full-time", "part-time", "remote"]).optional(),
  category: z.string().optional(),
  skills: z.string().optional(),
  deadline: z.string().optional(),
})

const EditJob = () => {
  const { id } = useParams()
  const router = useRouter()
  const { selectedJob: job, selectedJobLoading, handleFetchJobById, handleUpdateJob, isLoading } = useJobs()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      salary: "",
      type: "full-time",
      category: "it-technology",
      skills: "",
      deadline: "",
    },
  })

  // fetch job on mount
  useEffect(() => {
    if (id) handleFetchJobById(id as string)
  }, [id])

  // prefill form when job loads
  useEffect(() => {
    if (job) {
      form.reset({
        title: job.title,
        description: job.description,
        location: job.location ?? "",
        salary: job.salary ? String(job.salary) : "",
        type: job.type as "full-time" | "part-time" | "remote" | undefined,
        category: job.category ?? "it-technology",
        skills: job.skills?.join(", ") ?? "",
        deadline: job.deadline
          ? new Date(job.deadline).toISOString().split("T")[0]
          : "",
      })
    }
  }, [job, form])

  const type = useWatch({ control: form.control, name: "type" })
  const category = useWatch({ control: form.control, name: "category" })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!job) return
    handleUpdateJob({
      ...job,
      ...data,
      salary: data.salary,
      skills: data.skills
        ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    })
    router.push("/profile/my-jobs")
  }

  if (selectedJobLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 rounded-lg bg-gray-100" />
        ))}
      </div>
    )
  }

  if (!job) return null

  return (
    <Card className="border border-gray-100">
      <CardContent className="p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-6">
          Edit Job
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <ControllerInput
            name="title"
            form={form}
            label="Job Title"
            placeholder="e.g. Senior React Developer"
          />

          <ControllerInput
            name="description"
            form={form}
            label="Description"
            placeholder="Describe the role..."
          />

          <ControllerInput
            name="location"
            form={form}
            label="Location"
            placeholder="e.g. Almaty, Remote"
          />

          <ControllerInput
            name="salary"
            form={form}
            label="Salary (₸/month)"
            placeholder="e.g. 500000"
          />

          {/* Job Type */}
          <Field>
            <FieldLabel>Job Type</FieldLabel>
            <div className="flex gap-2 mt-1">
              {JOB_TYPES.map((t) => (
                <SelectBtn
                  key={t.value}
                  value={t.value}
                  label={t.label}
                  isSelected={type === t.value}
                  onClick={() =>
                    form.setValue(
                      "type",
                      t.value as "full-time" | "part-time" | "remote",
                    )
                  }
                />
              ))}
            </div>
          </Field>
          <Field>
            <FieldLabel>Category</FieldLabel>
            <div className="flex flex-wrap gap-2 mt-1">
              {JOB_CATEGORIES.map((c) => (
                <SelectBtn
                  key={c.value}
                  value={c.value}
                  label={c.label}
                  isSelected={category === c.value}
                  onClick={() => form.setValue("category", c.value)}
                />
              ))}
            </div>
          </Field>

          <ControllerInput
            name="skills"
            form={form}
            label="Skills"
            placeholder="React, TypeScript, Node.js"
            description="Separate skills with commas"
          />

          <ControllerInput
            name="deadline"
            form={form}
            label="Deadline"
            type="date"
          />

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditJob