import { notFound } from "next/navigation"
import { getAllJobs } from "@/lib/data/jobs"
import { getUseCasesByJobId } from "@/lib/data/use-cases"
import { UseCaseController } from "@/lib/controllers/UseCaseController"
import UseCaseDetailsView from "@/components/views/UseCaseDetailsView"

export async function generateStaticParams() {
  const jobs = await getAllJobs()
  const params = []

  for (const job of jobs) {
    const useCases = await getUseCasesByJobId(job.id)
    for (const useCase of useCases) {
      params.push({
        jobId: job.id,
        useCaseId: useCase.id,
      })
    }
  }

  return params
}

export async function generateMetadata({ params }: { params: { jobId: string, useCaseId: string } }) {
  const { job, useCase } = await UseCaseController.getUseCaseDetails(params.jobId, params.useCaseId)

  if (!useCase || !job) {
    return {
      title: "Use Case Not Found",
      description: "The requested use case could not be found."
    }
  }

  return {
    title: `${useCase.title} for ${job.title}s - AI Productivity`,
    description: useCase.description
  }
}

export default async function UseCasePage({ params }: { params: { jobId: string, useCaseId: string } }) {
  const { job, useCase, tools, sidebarItems } = await UseCaseController.getUseCaseDetails(params.jobId, params.useCaseId)

  if (!job || !useCase) {
    notFound()
  }

  return (
    <UseCaseDetailsView
      job={job}
      useCase={useCase}
      tools={tools}
      sidebarItems={sidebarItems}
    />
  )
}