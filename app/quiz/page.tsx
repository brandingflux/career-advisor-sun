"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

// Hooks & Utils
import { useAuth } from "@/hooks/useAuth"
import { saveQuizResponse } from "@/lib/quiz"

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { user, loading: authLoading } = useAuth()

  // Define quiz structure
  const quizQuestions = [
    {
      id: "work-style",
      question: "What's your preferred work style?",
      options: [
        { value: "creative", label: "Creative problem-solving and design" },
        { value: "analytical", label: "Analyzing data and finding patterns" },
        { value: "technical", label: "Building and optimizing systems" },
        { value: "collaborative", label: "Working with teams and clients" },
      ],
    },
    {
      id: "subjects",
      question: "Which subjects do you enjoy the most?",
      options: [
        { value: "math", label: "Mathematics and Statistics" },
        { value: "design", label: "Design and User Experience" },
        { value: "programming", label: "Programming and Logic" },
        { value: "business", label: "Business and Communication" },
      ],
    },
    {
      id: "tools",
      question: "Which tools or technologies interest you the most?",
      options: [
        { value: "frontend", label: "Web browsers and UI frameworks" },
        { value: "backend", label: "Servers, databases, and APIs" },
        { value: "data", label: "Data analysis and visualization tools" },
        { value: "cloud", label: "Cloud platforms and infrastructure" },
      ],
    },
    {
      id: "goals",
      question: "What are your career goals?",
      options: [
        { value: "impact", label: "Create products that impact many users" },
        { value: "innovation", label: "Work on cutting-edge technology" },
        { value: "stability", label: "Build a stable, well-paying career" },
        { value: "flexibility", label: "Have flexibility and work-life balance" },
      ],
    },
    {
      id: "environment",
      question: "What kind of work environment do you prefer?",
      options: [
        { value: "startup", label: "Fast-paced startup environment" },
        { value: "enterprise", label: "Established enterprise company" },
        { value: "agency", label: "Creative agency or consultancy" },
        { value: "remote", label: "Remote or independent work" },
      ],
    },
  ]
  
  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    if (!user) {
      setError("You must be logged in to submit your quiz.")
      setIsSubmitting(false)
      return
    }

    try {
      // Save response to Appwrite
      await saveQuizResponse(user.$id, answers)

      // Simulate delay for demo purposes
      setTimeout(() => {
        let career = "web-developer" // default

        if (answers.tools === "data" || answers.subjects === "math") {
          career = "data-scientist"
        } else if (answers.tools === "cloud") {
          career = "cloud-engineer"
        } else if (answers.tools === "backend") {
          career = "backend-developer"
        }

        router.push(`/roadmap?career=${career}`)
      }, 1500)

    } catch (err) {
      console.error("Error saving quiz:", err)
      setError("Failed to save your quiz. Please try again.")
      setIsSubmitting(false)
    }
  }

  const currentQuestion = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  // Show loading screen if auth is still checking
  if (authLoading) {
    return (
      <main className="container mx-auto max-w-md py-12 px-4 text-center">
        <p>Loading user data...</p>
      </main>
    )
  }

  // Redirect if not logged in
  if (!user) {
    return (
      <main className="container mx-auto max-w-md py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p className="mb-6">You must be logged in to take the quiz.</p>
        <Button onClick={() => router.push("/login")}>
          Log In / Sign Up
        </Button>
      </main>
    )
  }

  return (
    <main className="container mx-auto max-w-3xl py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Tech Career Quiz</h1>
      <p className="text-slate-600 text-center mb-8">
        Answer a few questions to discover the tech career path that best matches your interests and skills.
      </p>

      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-slate-500 mt-2 text-right">
          Question {currentStep + 1} of {quizQuestions.length}
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{currentQuestion.question}</CardTitle>
          <CardDescription>Select the option that best describes you</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={(value) => setAnswers({ ...answers, [currentQuestion.id]: value })}
          >
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-grow p-3 rounded-md hover:bg-slate-50 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <Button onClick={handleNext} disabled={!answers[currentQuestion.id] || isSubmitting}>
            {currentStep < quizQuestions.length - 1 ? (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : isSubmitting ? (
              "Processing..."
            ) : (
              <>
                Get Results <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}