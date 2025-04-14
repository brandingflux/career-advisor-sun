"use client"

import { useState, useCallback } from "react"
import { CheckCircle2, XCircle, AlertCircle, Loader2, BookOpen, FileText, UploadCloud, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FeedbackItem {
  type: "positive" | "improvement" | "suggestion"
  title: string
  description: string
}

interface CourseInsight {
  area: string
  strength: "strong" | "moderate" | "weak"
  description: string
}

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("")
  const [coursesText, setCoursesText] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [coursesFile, setCoursesFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAnalyzingCourses, setIsAnalyzingCourses] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackItem[] | null>(null)
  const [courseInsights, setCourseInsights] = useState<CourseInsight[] | null>(null)
  const [score, setScore] = useState<number | null>(null)

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ]
      
      if (!validTypes.includes(selectedFile.type)) {
        alert("Please upload a PDF, Word document, or text file")
        return
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB")
        return
      }

      setFile(selectedFile)
      
      // Read file content if text-based
      if (selectedFile.type === 'text/plain') {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          if (setFile === setResumeFile) {
            setResumeText(content)
          } else {
            setCoursesText(content)
          }
        }
        reader.readAsText(selectedFile)
      }
    }
  }

  const removeFile = (setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    setFile(null)
    if (setFile === setResumeFile) {
      setResumeText("")
    } else {
      setCoursesText("")
    }
  }

  const handleAnalyzeResume = useCallback(async () => {
    if (!resumeText.trim() && !resumeFile) return

    setIsAnalyzing(true)

    try {
      // In a real app, you would call an API here with the file or text
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Sample feedback based on common resume issues
      const sampleFeedback: FeedbackItem[] = [
        {
          type: "positive",
          title: "Strong technical skills section",
          description: "Your technical skills are well organized and comprehensive.",
        },
        {
          type: "improvement",
          title: "Quantify your achievements",
          description: "Add specific metrics and numbers to demonstrate your impact.",
        },
        {
          type: "suggestion",
          title: "Add a projects section",
          description: "Include relevant projects with links to GitHub repositories or live demos.",
        }
      ]

      setFeedback(sampleFeedback)
      setScore(78) // Sample score between 0-100
    } finally {
      setIsAnalyzing(false)
    }
  }, [resumeText, resumeFile])

  const handleAnalyzeCourses = useCallback(async () => {
    if (!coursesText.trim() && !coursesFile) return

    setIsAnalyzingCourses(true)

    try {
      // In a real app, you would call an API here
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1500))

      const sampleInsights: CourseInsight[] = [
        {
          area: "Computer Science Fundamentals",
          strength: "strong",
          description: "Your CS fundamentals are excellent.",
        },
        {
          area: "Web Development",
          strength: "moderate",
          description: "Consider learning more advanced frontend frameworks.",
        },
        {
          area: "Cloud & DevOps",
          strength: "weak",
          description: "Cloud skills are increasingly essential for tech roles.",
        }
      ]

      setCourseInsights(sampleInsights)
    } finally {
      setIsAnalyzingCourses(false)
    }
  }, [coursesText, coursesFile])

  const resetResume = () => {
    setFeedback(null)
    setScore(null)
    setResumeText("")
    setResumeFile(null)
  }

  const resetCourses = () => {
    setCourseInsights(null)
    setCoursesText("")
    setCoursesFile(null)
  }

  return (
    <main className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">AI Career Analysis</h1>
      <p className="text-slate-600 text-center mb-8">
        Upload your documents or paste text to get AI-powered career feedback
      </p>

      <Tabs defaultValue="resume" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="resume" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Resume Checker
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Course Analyzer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resume">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upload or Paste Your Resume</CardTitle>
                  <CardDescription>
                    Upload a PDF/DOCX file or paste the text content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <UploadCloud className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => handleFileChange(e, setResumeFile)}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer mb-2"
                    >
                      Upload Resume
                    </label>
                    <p className="text-xs text-gray-500">PDF, DOCX, or TXT (max 5MB)</p>
                  </div>

                  {resumeFile && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{resumeFile.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(setResumeFile)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-2 text-sm text-gray-500">OR</span>
                    </div>
                  </div>

                  <Textarea
                    placeholder="Paste your resume text here..."
                    className="min-h-[200px]"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleAnalyzeResume}
                    disabled={isAnalyzing || (!resumeText.trim() && !resumeFile)}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Resume"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-slate-600">Analyzing your resume...</p>
                </div>
              ) : feedback ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">AI Feedback</h2>
                    <div className="flex items-center">
                      <span className="mr-2">Resume Score:</span>
                      <Badge
                        variant="outline"
                        className={`
                          ${
                            score && score >= 80
                              ? "bg-green-50 text-green-700 border-green-200"
                              : score && score >= 60
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                          }
                        `}
                      >
                        {score}/100
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {feedback.map((item, index) => (
                      <Alert
                        key={index}
                        variant={
                          item.type === "positive" ? "default" : item.type === "improvement" ? "destructive" : "warning"
                        }
                      >
                        {item.type === "positive" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : item.type === "improvement" ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertTitle>{item.title}</AlertTitle>
                        <AlertDescription>{item.description}</AlertDescription>
                      </Alert>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full" onClick={resetResume}>
                    Reset & Analyze Another
                  </Button>
                </div>
              ) : (
                <Card className="h-full flex flex-col justify-center">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <FileText className="h-12 w-12 text-slate-300 mx-auto" />
                      <h3 className="text-lg font-medium">No Resume Analyzed Yet</h3>
                      <p className="text-slate-600">
                        Upload or paste your resume to get personalized feedback.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upload or List Your Courses</CardTitle>
                  <CardDescription>
                    Upload a document or list courses/certifications you've completed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <UploadCloud className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                    <input
                      type="file"
                      id="courses-upload"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => handleFileChange(e, setCoursesFile)}
                      className="hidden"
                    />
                    <label
                      htmlFor="courses-upload"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer mb-2"
                    >
                      Upload Course List
                    </label>
                    <p className="text-xs text-gray-500">PDF, DOCX, or TXT (max 5MB)</p>
                  </div>

                  {coursesFile && (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{coursesFile.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(setCoursesFile)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-2 text-sm text-gray-500">OR</span>
                    </div>
                  </div>

                  <Textarea
                    placeholder="e.g., CS50, Python for Everybody, React Bootcamp, AWS Certified Cloud Practitioner..."
                    className="min-h-[200px]"
                    value={coursesText}
                    onChange={(e) => setCoursesText(e.target.value)}
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleAnalyzeCourses}
                    disabled={isAnalyzingCourses || (!coursesText.trim() && !coursesFile)}
                    className="w-full"
                  >
                    {isAnalyzingCourses ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Courses"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              {isAnalyzingCourses ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-slate-600">Analyzing your courses...</p>
                </div>
              ) : courseInsights ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Course Analysis</h2>

                  <div className="space-y-4">
                    {courseInsights.map((insight, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div
                          className={`h-2 ${
                            insight.strength === "strong"
                              ? "bg-green-500"
                              : insight.strength === "moderate"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{insight.area}</CardTitle>
                            <Badge
                              variant={
                                insight.strength === "strong"
                                  ? "default"
                                  : insight.strength === "moderate"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {insight.strength === "strong"
                                ? "Strong"
                                : insight.strength === "moderate"
                                  ? "Moderate"
                                  : "Needs Work"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-600">{insight.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full" onClick={resetCourses}>
                    Reset & Analyze Other Courses
                  </Button>
                </div>
              ) : (
                <Card className="h-full flex flex-col justify-center">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <BookOpen className="h-12 w-12 text-slate-300 mx-auto" />
                      <h3 className="text-lg font-medium">No Courses Analyzed Yet</h3>
                      <p className="text-slate-600">
                        Upload or list your courses to get personalized insights.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}