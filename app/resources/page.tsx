import Link from "next/link"
import { ExternalLink, BookOpen, Code, Database, Cloud, LineChart, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Resource {
  title: string
  description: string
  url: string
  type: "Course" | "Documentation" | "Tutorial" | "Tool" | "Community"
  isPaid: boolean
}

interface ResourceCategory {
  id: string
  title: string
  icon: JSX.Element
  resources: Resource[]
}

export default function ResourcesPage() {
  const categories: ResourceCategory[] = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: <Code className="h-5 w-5" />,
      resources: [
        {
          title: "MDN Web Docs",
          description: "Comprehensive documentation for web technologies including HTML, CSS, and JavaScript.",
          url: "https://developer.mozilla.org",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "freeCodeCamp",
          description: "Free interactive coding lessons for web development with certifications.",
          url: "https://www.freecodecamp.org",
          type: "Course",
          isPaid: false,
        },
        {
          title: "React Documentation",
          description: "Official documentation for the React JavaScript library.",
          url: "https://reactjs.org",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "Next.js Documentation",
          description: "Learn about the React framework for production-grade applications.",
          url: "https://nextjs.org/docs",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "Frontend Masters",
          description: "In-depth courses on frontend development from industry experts.",
          url: "https://frontendmasters.com",
          type: "Course",
          isPaid: true,
        },
      ],
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: <Database className="h-5 w-5" />,
      resources: [
        {
          title: "Node.js Documentation",
          description: "Official documentation for Node.js, a JavaScript runtime for server-side development.",
          url: "https://nodejs.org/en/docs",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "Express.js Guide",
          description: "Documentation for Express, a minimal and flexible Node.js web application framework.",
          url: "https://expressjs.com",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "MongoDB University",
          description: "Free courses on MongoDB database design and development.",
          url: "https://university.mongodb.com",
          type: "Course",
          isPaid: false,
        },
        {
          title: "PostgreSQL Tutorial",
          description: "Comprehensive PostgreSQL tutorial with practical examples.",
          url: "https://www.postgresqltutorial.com",
          type: "Tutorial",
          isPaid: false,
        },
        {
          title: "REST API Design Best Practices",
          description: "Learn how to design RESTful APIs that are maintainable and scalable.",
          url: "https://restfulapi.net",
          type: "Documentation",
          isPaid: false,
        },
      ],
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      icon: <LineChart className="h-5 w-5" />,
      resources: [
        {
          title: "Kaggle",
          description: "Platform for data science competitions, datasets, and notebooks.",
          url: "https://www.kaggle.com",
          type: "Community",
          isPaid: false,
        },
        {
          title: "Fast.ai",
          description: "Practical deep learning courses for coders.",
          url: "https://www.fast.ai",
          type: "Course",
          isPaid: false,
        },
        {
          title: "TensorFlow Documentation",
          description: "Official documentation for the TensorFlow machine learning framework.",
          url: "https://www.tensorflow.org/learn",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "Hugging Face",
          description: "Community and platform for state-of-the-art machine learning.",
          url: "https://huggingface.co",
          type: "Tool",
          isPaid: false,
        },
        {
          title: "Coursera: Machine Learning Specialization",
          description: "Comprehensive machine learning course by Andrew Ng.",
          url: "https://www.coursera.org/specializations/machine-learning-introduction",
          type: "Course",
          isPaid: true,
        },
      ],
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      icon: <Cloud className="h-5 w-5" />,
      resources: [
        {
          title: "AWS Documentation",
          description: "Official documentation for Amazon Web Services.",
          url: "https://docs.aws.amazon.com",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "Microsoft Learn for Azure",
          description: "Free learning platform for Microsoft Azure cloud services.",
          url: "https://learn.microsoft.com/en-us/azure",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "Docker Documentation",
          description: "Official documentation for Docker containerization platform.",
          url: "https://docs.docker.com",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "Kubernetes Documentation",
          description: "Documentation for Kubernetes container orchestration system.",
          url: "https://kubernetes.io/docs",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "GitHub Actions Documentation",
          description: "Learn about GitHub's CI/CD platform for automating workflows.",
          url: "https://docs.github.com/en/actions",
          type: "Documentation",
          isPaid: false,
        },
      ],
    },
    {
      id: "security",
      title: "Cybersecurity",
      icon: <Shield className="h-5 w-5" />,
      resources: [
        {
          title: "OWASP Top Ten",
          description:
            "The standard awareness document for developers about the most critical security risks to web applications.",
          url: "https://owasp.org/www-project-top-ten",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "Hack The Box",
          description: "Online platform to test and advance your cybersecurity skills.",
          url: "https://www.hackthebox.eu",
          type: "Tool",
          isPaid: true,
        },
        {
          title: "TryHackMe",
          description: "Learn cybersecurity through hands-on exercises and labs.",
          url: "https://tryhackme.com",
          type: "Tool",
          isPaid: false,
        },
        {
          title: "Portswigger Web Security Academy",
          description: "Free online training in web security vulnerabilities.",
          url: "https://portswigger.net/web-security",
          type: "Course",
          isPaid: false,
        },
        {
          title: "Cybrary",
          description: "Free and premium cybersecurity training courses.",
          url: "https://www.cybrary.it",
          type: "Course",
          isPaid: false,
        },
      ],
    },
    {
      id: "career",
      title: "Career Preparation",
      icon: <BookOpen className="h-5 w-5" />,
      resources: [
        {
          title: "Tech Interview Handbook",
          description: "Curated interview preparation materials for busy engineers.",
          url: "https://www.techinterviewhandbook.org",
          type: "Documentation",
          isPaid: false,
        },
        {
          title: "Cracking the Coding Interview",
          description: "Popular book with coding interview questions and solutions.",
          url: "https://www.crackingthecodinginterview.com",
          type: "Tool",
          isPaid: true,
        },
        {
          title: "Pramp",
          description: "Practice mock interviews with peers for free.",
          url: "https://www.pramp.com",
          type: "Tool",
          isPaid: false,
        },
        {
          title: "LinkedIn Learning",
          description: "Video courses taught by industry experts in various tech fields.",
          url: "https://www.linkedin.com/learning",
          type: "Course",
          isPaid: true,
        },
        {
          title: "Glassdoor",
          description: "Company reviews, salary information, and interview questions.",
          url: "https://www.glassdoor.com",
          type: "Tool",
          isPaid: false,
        },
      ],
    },
  ]

  return (
    <main className="container mx-auto max-w-6xl py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Learning Resources</h1>
      <p className="text-slate-600 text-center mb-12 max-w-3xl mx-auto">
        Explore curated resources for different tech career paths. These learning materials will help you build the
        skills needed to succeed in your chosen field.
      </p>

      <Tabs defaultValue="frontend" className="mb-12">
        <TabsList className="flex flex-wrap justify-center mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {category.icon}
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.resources.map((resource, index) => (
                <Card key={index} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <Badge variant={resource.isPaid ? "default" : "outline"}>
                        {resource.isPaid ? "Paid" : "Free"}
                      </Badge>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <Badge variant="secondary">{resource.type}</Badge>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Visit Resource <ExternalLink className="h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-slate-50 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Need personalized resource recommendations?</h2>
        <p className="text-slate-600 mb-6">
          Chat with our AI advisor to get customized learning resources based on your specific goals and experience
          level.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Chat with AI Advisor
        </Link>
      </div>
    </main>
  )
}
