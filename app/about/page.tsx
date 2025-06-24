import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, ExternalLink, Trophy, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  links?: {
    github?: string
    linkedin?: string
    website?: string
  }
}

export default function AboutPage() {
  const teamMembers: TeamMember[] = [
    {
      name: "Muhammad Umar Aminu",
      role: "Full Stack Developer",
      bio: "A seasoned software engineer and tech innovator passionate about building smart, impactful solutions..",
      image: "/placeholder.svg?height=300&width=300",
      links: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
  ]

  return (
    <main className="container mx-auto max-w-6xl py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About TechPathAI</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Empowering students to discover and pursue their ideal tech career paths through AI-powered guidance.
        </p>
      </div>

      {/* Hackathon Section */}
      <div className="mb-20">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center bg-white rounded-full shadow-lg">
                <Trophy className="w-32 h-32 text-primary/60" />
              </div>
            </div>
            <div className="md:w-2/3">
              <Badge className="mb-4">TechPath Project</Badge>
              <h2 className="text-3xl font-bold mb-4">BiFusion Labs</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-sm text-slate-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>April 2024</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Nigeria</span>
                </div>
              </div>
              <p className="text-slate-700 mb-6">
                TechPathAI was developed to address a profound issue, we identified the
                challenge many students face when choosing a tech career path. We created this platform to provide
                personalized guidance using AI to help students discover careers that match their skills, interests, and
                goals.
              </p>
              <p className="text-slate-700">
                Our solution won recognition for its innovative approach to career guidance and its potential to make a
                real impact on students' educational and professional journeys.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We believe that every student has unique strengths and interests. Our AI-powered platform provides
                tailored career recommendations based on individual profiles.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accessible Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We're committed to making quality career resources accessible to all students, regardless of their
                background or location, to help them succeed in the tech industry.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Industry Relevance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We continuously update our platform to reflect the latest industry trends and demands, ensuring students
                are prepared for the current and future job market.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-2">Meet Our Team</h2>
        <p className="text-center text-slate-600 mb-12">The talented developers behind TechPathAI</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{member.bio}</p>
              </CardContent>
              {member.links && (
                <CardFooter className="flex gap-2">
                  {member.links.github && (
                    <Button variant="outline" size="icon" asChild>
                      <Link href={member.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                  )}
                  {member.links.linkedin && (
                    <Button variant="outline" size="icon" asChild>
                      <Link href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                  )}
                  {member.links.website && (
                    <Button variant="outline" size="icon" asChild>
                      <Link href={member.links.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Website</span>
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
        <p className="text-slate-600 mb-8">Have questions or feedback? We'd love to hear from you!</p>
        <Button asChild size="lg">
          <Link href="mailto:lunetechng@gmail.com">Contact Us</Link>
        </Button>
      </div>
    </main>
  )
}
