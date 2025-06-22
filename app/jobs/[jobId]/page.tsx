import { notFound } from "next/navigation"
import { getAllJobs } from "@/lib/data/jobs"
import { JobController } from "@/lib/controllers/JobController"
import JobDetailsView from "@/components/views/JobDetailsView"

export async function generateStaticParams() {
  const jobs = await getAllJobs()
  return jobs.map((job) => ({
    jobId: job.id,
  }))
}

export async function generateMetadata({ params }: { params: { jobId: string } }) {
  const { job } = await JobController.getJobDetails(params.jobId)

  if (!job) {
    return {
      title: "Job Not Found",
      description: "The requested job category could not be found."
    }
  }

  return {
    title: `${job.title} AI Guide - ThriveWithAI`,
    description: job.description
  }
}

export default async function JobPage({ params }: { params: { jobId: string } }) {
  const { job, useCases, additionalResources } = await JobController.getJobDetails(params.jobId)

  if (!job) {
    notFound()
  }

  return (
    <JobDetailsView
      job={job}
      useCases={useCases}
      additionalResources={additionalResources}
    />
  )
}