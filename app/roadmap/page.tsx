"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { CheckCircle2, BookOpen, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RoadmapStep {
  title: string
  description: string
  resources: { title: string; url: string }[]
  timeframe: string
}

interface CareerRoadmap {
  title: string
  description: string
  icon: JSX.Element
  salary: string
  demand: "High" | "Medium" | "Low"
  steps: RoadmapStep[]
}

export default function RoadmapPage() {
  const searchParams = useSearchParams()
  const careerParam = searchParams.get("career") || "web-developer"
  const [activeStep, setActiveStep] = useState(0)

  // Career roadmaps data
  const roadmaps: Record<string, CareerRoadmap> = {
    "web-developer": {
      title: "Web Developer",
      description:
        "Web developers create and maintain websites and web applications. They work with languages like HTML, CSS, and JavaScript to build interactive and responsive user interfaces.",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      salary: "$75,000 - $120,000",
      demand: "High",
      steps: [
        {
          title: "HTML, CSS & JavaScript Fundamentals",
          description:
            "Learn the core technologies of the web: HTML for structure, CSS for styling, and JavaScript for interactivity.",
          timeframe: "2-3 months",
          resources: [
            { title: "MDN Web Docs", url: "https://developer.mozilla.org" },
            { title: "freeCodeCamp Web Development", url: "https://www.freecodecamp.org" },
            { title: "CSS Tricks", url: "https://css-tricks.com" },
          ],
        },
        {
          title: "Frontend Frameworks",
          description:
            "Learn a modern JavaScript framework like React, Vue, or Angular to build complex user interfaces.",
          timeframe: "3-4 months",
          resources: [
            { title: "React Documentation", url: "https://reactjs.org" },
            { title: "Next.js Documentation", url: "https://nextjs.org" },
            { title: "Vue.js Guide", url: "https://vuejs.org" },
          ],
        },
        {
          title: "Backend Basics",
          description: "Learn server-side programming with Node.js, Express, and database fundamentals.",
          timeframe: "2-3 months",
          resources: [
            { title: "Node.js Documentation", url: "https://nodejs.org" },
            { title: "Express.js Guide", url: "https://expressjs.com" },
            { title: "MongoDB University", url: "https://university.mongodb.com" },
          ],
        },
        {
          title: "Full-Stack Projects",
          description: "Build complete web applications that integrate frontend and backend technologies.",
          timeframe: "3-4 months",
          resources: [
            { title: "GitHub Student Developer Pack", url: "https://education.github.com/pack" },
            { title: "The Odin Project", url: "https://www.theodinproject.com" },
            { title: "Full Stack Open", url: "https://fullstackopen.com" },
          ],
        },
        {
          title: "DevOps & Deployment",
          description: "Learn how to deploy and maintain web applications using cloud services.",
          timeframe: "1-2 months",
          resources: [
            { title: "Vercel Documentation", url: "https://vercel.com/docs" },
            { title: "AWS Free Tier", url: "https://aws.amazon.com/free" },
            { title: "GitHub Actions", url: "https://github.com/features/actions" },
          ],
        },
      ],
    },
    "data-scientist": {
      title: "Data Scientist",
      description:
        "Data scientists analyze and interpret complex data to help organizations make better decisions. They use statistics, machine learning, and programming to extract insights from data.",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      salary: "$90,000 - $150,000",
      demand: "High",
      steps: [
        {
          title: "Mathematics & Statistics",
          description: "Build a strong foundation in linear algebra, calculus, probability, and statistics.",
          timeframe: "3-4 months",
          resources: [
            { title: "Khan Academy", url: "https://www.khanacademy.org" },
            { title: "StatQuest with Josh Starmer", url: "https://www.youtube.com/c/joshstarmer" },
            { title: "3Blue1Brown", url: "https://www.3blue1brown.com" },
          ],
        },
        {
          title: "Programming for Data Science",
          description:
            "Learn Python and libraries like NumPy, Pandas, and Matplotlib for data manipulation and visualization.",
          timeframe: "2-3 months",
          resources: [
            { title: "Python for Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook" },
            { title: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
            { title: "DataCamp", url: "https://www.datacamp.com" },
          ],
        },
        {
          title: "Machine Learning Fundamentals",
          description:
            "Learn the core concepts of machine learning, including supervised and unsupervised learning algorithms.",
          timeframe: "3-4 months",
          resources: [
            { title: "Andrew Ng's Machine Learning Course", url: "https://www.coursera.org/learn/machine-learning" },
            { title: "Scikit-learn Documentation", url: "https://scikit-learn.org" },
            { title: "Fast.ai", url: "https://www.fast.ai" },
          ],
        },
        {
          title: "Deep Learning",
          description: "Explore neural networks and deep learning frameworks like TensorFlow and PyTorch.",
          timeframe: "3-4 months",
          resources: [
            { title: "Deep Learning Specialization", url: "https://www.deeplearning.ai" },
            { title: "TensorFlow Documentation", url: "https://www.tensorflow.org" },
            { title: "PyTorch Tutorials", url: "https://pytorch.org/tutorials" },
          ],
        },
        {
          title: "Data Science Projects & Deployment",
          description: "Build end-to-end data science projects and learn how to deploy models to production.",
          timeframe: "2-3 months",
          resources: [
            { title: "Kaggle Competitions", url: "https://www.kaggle.com/competitions" },
            { title: "MLOps on Azure", url: "https://learn.microsoft.com/en-us/azure/machine-learning" },
            { title: "Hugging Face", url: "https://huggingface.co" },
          ],
        },
      ],
    },
    "cloud-engineer": {
      title: "Cloud Engineer",
      description:
        "Cloud engineers design, implement, and manage cloud infrastructure. They work with platforms like AWS, Azure, and Google Cloud to build scalable and reliable systems.",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      salary: "$85,000 - $140,000",
      demand: "High",
      steps: [
        {
          title: "Networking Fundamentals",
          description: "Learn the basics of computer networking, including TCP/IP, DNS, and HTTP.",
          timeframe: "1-2 months",
          resources: [
            {
              title: "Networking for Web Developers",
              url: "https://www.udacity.com/course/networking-for-web-developers--ud256",
            },
            {
              title: "Computer Networking: A Top-Down Approach",
              url: "https://gaia.cs.umass.edu/kurose_ross/index.php",
            },
            { title: "Practical Networking", url: "https://www.practicalnetworking.net" },
          ],
        },
        {
          title: "Linux & Command Line",
          description: "Develop proficiency in Linux operating systems and command-line tools.",
          timeframe: "1-2 months",
          resources: [
            { title: "Linux Journey", url: "https://linuxjourney.com" },
            { title: "The Linux Command Line", url: "https://linuxcommand.org/tlcl.php" },
            { title: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit" },
          ],
        },
        {
          title: "Cloud Platforms",
          description: "Learn a major cloud platform like AWS, Azure, or Google Cloud.",
          timeframe: "3-4 months",
          resources: [
            { title: "AWS Free Tier", url: "https://aws.amazon.com/free" },
            { title: "Microsoft Learn for Azure", url: "https://learn.microsoft.com/en-us/azure" },
            { title: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google" },
          ],
        },
        {
          title: "Infrastructure as Code",
          description: "Learn tools like Terraform, CloudFormation, or Pulumi to manage infrastructure as code.",
          timeframe: "2-3 months",
          resources: [
            { title: "Terraform Documentation", url: "https://www.terraform.io/docs" },
            { title: "AWS CloudFormation Guide", url: "https://docs.aws.amazon.com/cloudformation" },
            { title: "Pulumi Documentation", url: "https://www.pulumi.com/docs" },
          ],
        },
        {
          title: "DevOps & CI/CD",
          description: "Learn containerization, orchestration, and continuous integration/deployment pipelines.",
          timeframe: "2-3 months",
          resources: [
            { title: "Docker Documentation", url: "https://docs.docker.com" },
            { title: "Kubernetes Documentation", url: "https://kubernetes.io/docs" },
            { title: "GitHub Actions", url: "https://github.com/features/actions" },
          ],
        },
      ],
    },
    "backend-developer": {
      title: "Backend Developer",
      description:
        "Backend developers build and maintain the server-side of web applications. They work with databases, APIs, and server logic to power web applications.",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      salary: "$80,000 - $130,000",
      demand: "High",
      steps: [
        {
          title: "Programming Fundamentals",
          description: "Learn a backend language like JavaScript (Node.js), Python, Java, or C#.",
          timeframe: "2-3 months",
          resources: [
            { title: "Node.js Documentation", url: "https://nodejs.org/en/docs" },
            { title: "Python.org", url: "https://www.python.org" },
            { title: "Java Tutorials", url: "https://dev.java/learn" },
          ],
        },
        {
          title: "Databases",
          description: "Learn SQL and NoSQL databases like PostgreSQL, MySQL, MongoDB, or Redis.",
          timeframe: "2-3 months",
          resources: [
            { title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com" },
            { title: "MongoDB University", url: "https://university.mongodb.com" },
            { title: "Redis Documentation", url: "https://redis.io/documentation" },
          ],
        },
        {
          title: "APIs & Web Servers",
          description:
            "Learn how to build RESTful and GraphQL APIs using frameworks like Express, Django, or Spring Boot.",
          timeframe: "2-3 months",
          resources: [
            { title: "Express.js Documentation", url: "https://expressjs.com" },
            { title: "Django REST Framework", url: "https://www.django-rest-framework.org" },
            { title: "GraphQL Documentation", url: "https://graphql.org/learn" },
          ],
        },
        {
          title: "Authentication & Security",
          description: "Learn about authentication, authorization, and web security best practices.",
          timeframe: "1-2 months",
          resources: [
            { title: "OWASP Top Ten", url: "https://owasp.org/www-project-top-ten" },
            { title: "Auth0 Documentation", url: "https://auth0.com/docs" },
            { title: "Web Security Academy", url: "https://portswigger.net/web-security" },
          ],
        },
        {
          title: "System Design & Architecture",
          description: "Learn about microservices, serverless, and designing scalable systems.",
          timeframe: "2-3 months",
          resources: [
            { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
            { title: "AWS Lambda Documentation", url: "https://docs.aws.amazon.com/lambda" },
            { title: "Microservices.io", url: "https://microservices.io" },
          ],
        },
      ],
    },
  }

  const currentRoadmap = roadmaps[careerParam]

  if (!currentRoadmap) {
    return (
      <main className="container mx-auto max-w-4xl py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Roadmap Not Found</h1>
        <p className="text-center">Sorry, we couldn't find a roadmap for the specified career path.</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto max-w-4xl py-12 px-4">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-center mb-4">{currentRoadmap.title} Career Path</h1>
        {/* Personalization Banner */}
        <div className="bg-primary/10 rounded-lg p-4 mb-6 mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/20">
              <span className="text-primary font-bold">2</span>
            </div>
            <div>
              <h3 className="font-medium text-primary">You're likely at an intermediate level</h3>
              <p className="text-sm text-slate-600">
                Focus on the "{currentRoadmap.steps[1].title}" step to advance your skills.
              </p>
            </div>
          </div>
        </div>
        <p className="text-slate-600 text-center mb-6">{currentRoadmap.description}</p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm font-normal">
              Salary Range: {currentRoadmap.salary}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`text-sm font-normal ${
                currentRoadmap.demand === "High"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : currentRoadmap.demand === "Medium"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              Demand: {currentRoadmap.demand}
            </Badge>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Save Roadmap
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {currentRoadmap.steps.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                activeStep === index ? "bg-primary text-primary-foreground" : "bg-slate-100 hover:bg-slate-200"
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
                  {index + 1}
                </div>
                <h3 className="font-medium">{step.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{currentRoadmap.steps[activeStep].title}</CardTitle>
              <CardDescription>Estimated time: {currentRoadmap.steps[activeStep].timeframe}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{currentRoadmap.steps[activeStep].description}</p>

              <h4 className="font-semibold mb-3">Recommended Resources</h4>
              <div className="space-y-3">
                {currentRoadmap.steps[activeStep].resources.map((resource, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        {resource.title}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Mark as Complete
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
