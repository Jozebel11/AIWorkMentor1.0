import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { BarChart, TrendingUp, Database, Brain, Target, Zap } from "lucide-react"

export const metadata = {
  title: "Research Data Analysis with AI - ThriveWithAI",
  description: "Advanced techniques and best practices for using AI tools to analyze research data, identify patterns, and generate insights.",
}

export default function ResearchDataAnalysisPage() {
  const analysisTypes = [
    {
      icon: BarChart,
      title: "Quantitative Data Analysis",
      description: "Statistical analysis and pattern recognition in numerical data",
      techniques: [
        "Automated statistical testing and hypothesis validation",
        "Pattern recognition in large datasets",
        "Predictive modeling and forecasting",
        "Correlation and regression analysis",
        "Time series analysis and trend identification"
      ],
      tools: ["ChatGPT", "Claude", "Python AI libraries", "R with AI packages"],
      useCase: "Analyzing survey responses, experimental data, or longitudinal studies"
    },
    {
      icon: Brain,
      title: "Qualitative Data Analysis",
      description: "Text analysis, theme identification, and content interpretation",
      techniques: [
        "Automated coding and theme extraction",
        "Sentiment analysis and emotion detection",
        "Content analysis and categorization",
        "Interview transcript analysis",
        "Literature review synthesis"
      ],
      tools: ["ChatGPT", "Claude", "NVivo with AI", "Atlas.ti"],
      useCase: "Processing interviews, focus groups, or open-ended survey responses"
    },
    {
      icon: Database,
      title: "Mixed Methods Analysis",
      description: "Combining quantitative and qualitative approaches with AI",
      techniques: [
        "Triangulation of multiple data sources",
        "Sequential explanatory analysis",
        "Concurrent embedded analysis",
        "Cross-validation of findings",
        "Meta-analysis and synthesis"
      ],
      tools: ["Multiple AI platforms", "Integrated analysis software"],
      useCase: "Complex research projects requiring multiple analytical approaches"
    }
  ]

  const workflowSteps = [
    {
      step: "1. Data Preparation",
      description: "Clean and organize data for AI analysis",
      tasks: [
        "Remove or handle missing data points",
        "Standardize data formats and structures",
        "Anonymize sensitive information",
        "Create data dictionaries and documentation",
        "Validate data quality and completeness"
      ],
      aiAssistance: "Use AI to identify data quality issues, suggest cleaning strategies, and automate repetitive preprocessing tasks"
    },
    {
      step: "2. Exploratory Analysis",
      description: "Initial investigation to understand data patterns",
      tasks: [
        "Generate descriptive statistics",
        "Create initial visualizations",
        "Identify outliers and anomalies",
        "Explore relationships between variables",
        "Formulate analytical hypotheses"
      ],
      aiAssistance: "AI can quickly generate multiple analytical perspectives, suggest visualization approaches, and identify unexpected patterns"
    },
    {
      step: "3. Deep Analysis",
      description: "Comprehensive analysis using advanced techniques",
      tasks: [
        "Apply appropriate statistical methods",
        "Conduct thematic analysis for qualitative data",
        "Test hypotheses and research questions",
        "Perform advanced modeling or prediction",
        "Validate findings through multiple approaches"
      ],
      aiAssistance: "AI assists with method selection, interpretation of results, and identification of alternative analytical approaches"
    },
    {
      step: "4. Interpretation & Synthesis",
      description: "Make sense of findings and draw conclusions",
      tasks: [
        "Interpret statistical and thematic results",
        "Synthesize findings across different analyses",
        "Identify implications and significance",
        "Consider limitations and alternative explanations",
        "Prepare findings for presentation"
      ],
      aiAssistance: "AI helps synthesize complex findings, suggest interpretations, and identify potential implications or applications"
    }
  ]

  const promptTemplates = [
    {
      category: "Statistical Analysis",
      prompt: `Analyze this dataset and provide insights:

Data Description: [describe your dataset]
Research Questions: [list your specific questions]
Variables: [list key variables and their types]

Please:
1. Suggest appropriate statistical tests
2. Identify key patterns and relationships
3. Highlight any concerning outliers or anomalies
4. Recommend visualization approaches
5. Suggest additional analyses that might be valuable

Data: [paste relevant data or summary statistics]`,
      tips: "Be specific about your research context and what you're trying to understand"
    },
    {
      category: "Qualitative Coding",
      prompt: `Help me analyze these qualitative responses:

Research Topic: [your research focus]
Data Type: [interviews, surveys, focus groups, etc.]
Sample Size: [number of responses]
Research Questions: [what you're investigating]

Please:
1. Identify major themes and patterns
2. Suggest a coding framework
3. Highlight interesting quotes or examples
4. Note any contradictions or tensions
5. Suggest areas for deeper exploration

Responses: [paste sample responses or summaries]`,
      tips: "Provide context about your research goals and theoretical framework"
    },
    {
      category: "Literature Synthesis",
      prompt: `Synthesize findings from these research studies:

Research Topic: [your area of focus]
Number of Studies: [how many you're analyzing]
Study Types: [experimental, observational, qualitative, etc.]
Time Period: [publication years]

For each study, I'll provide: methodology, key findings, limitations

Please help me:
1. Identify consistent patterns across studies
2. Note contradictory findings and possible explanations
3. Assess the strength of evidence
4. Identify gaps in the literature
5. Suggest directions for future research

Studies: [provide study summaries]`,
      tips: "Include methodology details to help AI assess the quality and comparability of studies"
    }
  ]

  const bestPractices = [
    {
      title: "Maintain Research Rigor",
      practices: [
        "Always verify AI interpretations against established methods",
        "Use AI as a tool to enhance, not replace, analytical thinking",
        "Document all AI-assisted analysis steps for reproducibility",
        "Cross-validate AI findings with traditional analytical approaches"
      ]
    },
    {
      title: "Ensure Data Privacy",
      practices: [
        "Remove all personally identifiable information before AI analysis",
        "Use secure, privacy-compliant AI platforms when possible",
        "Be aware of data retention policies of AI services",
        "Consider using local AI tools for sensitive research data"
      ]
    },
    {
      title: "Validate AI Outputs",
      practices: [
        "Check AI-generated statistics and calculations independently",
        "Verify that AI interpretations align with domain knowledge",
        "Test AI suggestions on subset of data before full implementation",
        "Seek peer review of AI-assisted analytical approaches"
      ]
    },
    {
      title: "Document Everything",
      practices: [
        "Keep detailed records of AI tools and prompts used",
        "Document any modifications made to AI suggestions",
        "Maintain version control of analytical approaches",
        "Create reproducible workflows for future research"
      ]
    }
  ]

  return (
    <div className="container py-8">
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Research Data Analysis", href: "/resources/research-data-analysis", current: true }
        ]}
        className="mb-6"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Research Data Analysis with AI
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Advanced techniques for AI-powered research data analysis and insights
          </p>
          <Badge variant="secondary" className="mt-4">
            For Researchers & Analysts
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Revolutionizing Research Analysis</CardTitle>
            <CardDescription>
              How AI is transforming the way researchers analyze and interpret data
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              AI tools are revolutionizing research data analysis by enabling researchers to process 
              larger datasets, identify complex patterns, and generate insights more efficiently than 
              ever before. However, successful AI-assisted research requires understanding both the 
              capabilities and limitations of these tools.
            </p>
            <p>
              This guide provides advanced techniques for leveraging AI in research while maintaining 
              scientific rigor, ensuring reproducibility, and generating reliable, valid insights 
              that advance knowledge in your field.
            </p>
          </CardContent>
        </Card>

        {/* Analysis Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">AI-Enhanced Analysis Approaches</h2>
          <div className="space-y-6">
            {analysisTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <type.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{type.title}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-3">AI Techniques:</h4>
                      <ul className="space-y-2">
                        {type.techniques.map((technique, techIndex) => (
                          <li key={techIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm">{technique}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Recommended Tools:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {type.tools.map((tool, toolIndex) => (
                          <Badge key={toolIndex} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm font-medium mb-1">Best For:</p>
                        <p className="text-sm text-muted-foreground">{type.useCase}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">AI-Enhanced Analysis Workflow</h2>
          <div className="space-y-6">
            {workflowSteps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{step.step}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-3">Key Tasks:</h4>
                      <ul className="space-y-2">
                        {step.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">AI Assistance:</h4>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm">{step.aiAssistance}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Prompt Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Research Analysis Prompt Templates</h2>
          <div className="space-y-6">
            {promptTemplates.map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                      <div className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Prompt Template:
                      </div>
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {template.prompt}
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
                      <p className="text-sm font-medium mb-1">💡 Pro Tip:</p>
                      <p className="text-sm text-muted-foreground">{template.tips}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Best Practices for AI-Assisted Research</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {bestPractices.map((practice, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    {practice.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {practice.practices.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advanced Techniques */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Advanced AI Research Techniques
            </CardTitle>
            <CardDescription>
              Cutting-edge approaches for sophisticated research analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3">Automated Hypothesis Generation:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Use AI to identify unexpected patterns in data</li>
                  <li>• Generate testable hypotheses from exploratory analysis</li>
                  <li>• Suggest novel research directions based on findings</li>
                  <li>• Cross-reference findings with existing literature</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Multi-Modal Analysis:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Combine text, numerical, and visual data analysis</li>
                  <li>• Integrate multiple data sources for comprehensive insights</li>
                  <li>• Use AI for cross-validation across different data types</li>
                  <li>• Generate holistic interpretations of complex datasets</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Transform Your Research Analysis?</CardTitle>
            <CardDescription>
              Start implementing AI in your research workflow today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <Database className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Start Small</h3>
                <p className="text-sm text-muted-foreground">
                  Begin with simple data exploration and pattern identification
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Brain className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Build Skills</h3>
                <p className="text-sm text-muted-foreground">
                  Practice with different AI tools and analytical approaches
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Scale Up</h3>
                <p className="text-sm text-muted-foreground">
                  Apply AI to larger, more complex research projects
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}