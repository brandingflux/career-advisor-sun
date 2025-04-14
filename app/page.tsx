import Link from "next/link"
import { ArrowRight, Code, Database, Cloud, LineChart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const careerPaths = [
    {
      title: "Web Developer",
      description: "Build interactive websites and web applications",
      icon: <Code className="h-8 w-8 text-primary" />,
      link: "/roadmap?career=web-developer",
    },
    {
      title: "Data Scientist",
      description: "Analyze and interpret complex data to inform decisions",
      icon: <LineChart className="h-8 w-8 text-primary" />,
      link: "/roadmap?career=data-scientist",
    },
    {
      title: "Cloud Engineer",
      description: "Design and maintain cloud infrastructure and services",
      icon: <Cloud className="h-8 w-8 text-primary" />,
      link: "/roadmap?career=cloud-engineer",
    },
    {
      title: "Backend Developer",
      description: "Create server-side logic and databases for applications",
      icon: <Database className="h-8 w-8 text-primary" />,
      link: "/roadmap?career=backend-developer",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Discover Your Tech Career Path with AI
          </h1>
          <p className="mt-6 text-xl text-slate-600">
            Let AI guide your journey into tech — tailored to your skills, personality, and goals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/quiz">
                Start Career Quiz <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/chat">
                Chat with AI Advisor <Zap className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Career Paths */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Career Paths</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPaths.map((career, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-center mb-4">{career.icon}</div>
                  <CardTitle className="text-center">{career.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{career.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={career.link}>
                      View Career Path <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Take the Career Quiz</h3>
              <p className="text-slate-600">Answer a few questions about your interests, skills, and preferences.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Personalized Recommendations</h3>
              <p className="text-slate-600">
                Our AI analyzes your responses to suggest the best tech career paths for you.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Follow Your Roadmap</h3>
              <p className="text-slate-600">
                Get a detailed learning path with resources to help you achieve your career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to find your perfect tech career?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Start your journey today with our AI-powered career guidance tools.
          </p>
          <Button asChild size="lg">
            <Link href="/quiz">Get Started</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
