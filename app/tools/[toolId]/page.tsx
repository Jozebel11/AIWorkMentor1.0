import { notFound } from "next/navigation"
import { getAllTools } from "@/lib/data/tools"
import { ToolController } from "@/lib/controllers/ToolController"
import ToolDetailsView from "@/components/views/ToolDetailsView"

export async function generateStaticParams() {
  const tools = await getAllTools()
  return tools.map((tool) => ({
    toolId: tool.id,
  }))
}

export async function generateMetadata({ params }: { params: { toolId: string } }) {
  const { tool } = await ToolController.getToolDetails(params.toolId)

  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "The requested AI tool could not be found."
    }
  }

  return {
    title: `${tool.name} - AI Productivity`,
    description: tool.description
  }
}

export default async function ToolPage({ params }: { params: { toolId: string } }) {
  const { tool, relatedTools } = await ToolController.getToolDetails(params.toolId)

  if (!tool) {
    notFound()
  }

  return <ToolDetailsView tool={tool} relatedTools={relatedTools} />
}