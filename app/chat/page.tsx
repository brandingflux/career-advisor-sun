"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI Career Advisor. Ask me anything about tech careers!",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userLevel, setUserLevel] = useState<"beginner" | "intermediate" | "advanced" | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // In a real app, you would call an API here
    // For now, we'll simulate a response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "web developer":
          "Web development is a great career choice! You can specialize in frontend (user interfaces), backend (server logic), or become a full-stack developer. The field offers high demand, good salaries, and remote work opportunities. I recommend starting with HTML, CSS, and JavaScript, then learning a framework like React or Next.js.",
        "data scientist":
          "Data Science combines statistics, programming, and domain expertise to extract insights from data. It's a high-paying field with growing demand. You'll need to learn Python, statistics, machine learning, and data visualization. Many universities now offer specialized degrees in this field.",
        "cloud engineer":
          "Cloud engineering focuses on designing, implementing, and managing cloud infrastructure. Companies are rapidly moving to the cloud, creating high demand for these skills. You should learn about AWS, Azure, or Google Cloud, along with concepts like Infrastructure as Code, containerization, and networking.",
        "software engineer":
          "Software engineering is a broad field with many specializations. It offers excellent career prospects, competitive salaries, and opportunities in virtually every industry. Start by building a strong foundation in computer science concepts and a programming language like Python or JavaScript.",
        cybersecurity:
          "Cybersecurity is critical as digital threats continue to evolve. This field has nearly zero unemployment and offers competitive salaries. You can specialize in areas like network security, application security, or security analysis. Many professionals start in IT roles before specializing in security.",
      }

      // Default response if no keywords match
      let responseText =
        "That's a great question about tech careers! To give you the most helpful advice, could you provide more specific details about what you're interested in? For example, are you curious about web development, data science, cybersecurity, or another tech field?"

      // Check if the user's message contains any keywords
      const userMessageLower = userMessage.content.toLowerCase()
      for (const [keyword, response] of Object.entries(responses)) {
        if (userMessageLower.includes(keyword)) {
          responseText = response
          break
        }
      }

      // Determine user level based on message content
      if (!userLevel) {
        if (
          userMessageLower.includes("beginner") ||
          userMessageLower.includes("start") ||
          userMessageLower.includes("new to") ||
          userMessageLower.includes("learning")
        ) {
          setUserLevel("beginner")
        } else if (
          userMessageLower.includes("intermediate") ||
          userMessageLower.includes("some experience") ||
          userMessageLower.includes("familiar with")
        ) {
          setUserLevel("intermediate")
        } else if (
          userMessageLower.includes("advanced") ||
          userMessageLower.includes("expert") ||
          userMessageLower.includes("years of experience") ||
          userMessageLower.includes("professional")
        ) {
          setUserLevel("advanced")
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <main className="container mx-auto max-w-4xl py-6 px-4 h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">AI Career Advisor</h1>
          <p className="text-slate-600">Ask me anything about tech careers, skills, or education paths</p>
        </div>

        {userLevel && (
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {userLevel === "beginner" ? (
                <span>
                  You're at a <strong>beginner level</strong>. Focus on building fundamentals and completing
                  introductory courses.
                </span>
              ) : userLevel === "intermediate" ? (
                <span>
                  You're at an <strong>intermediate level</strong>. Consider specialized courses and building portfolio
                  projects.
                </span>
              ) : (
                <span>
                  You're at an <strong>advanced level</strong>. Focus on system design, leadership skills, and staying
                  current with emerging technologies.
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Card className="flex-grow flex flex-col overflow-hidden">
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-3",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-slate-100 text-slate-900",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      <span className="text-xs font-medium">{message.role === "assistant" ? "AI Advisor" : "You"}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-3 bg-slate-100 text-slate-900">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">AI Advisor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Ask about tech careers, skills, or education paths..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </main>
  )
}
