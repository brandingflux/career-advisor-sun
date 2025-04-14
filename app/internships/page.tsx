"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const internships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Innovatech Solutions",
    category: "frontend",
    location: "Remote",
    duration: "3 months",
    stipend: "$500/month",
    description: "Work on cutting-edge UI with React, Tailwind, and Framer Motion.",
    skills: ["React", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "2",
    title: "Backend Developer Intern",
    company: "DataFlow Systems",
    category: "backend",
    location: "Remote",
    duration: "6 months",
    stipend: "$700/month",
    description: "Build robust APIs and microservices using Node.js and Express.",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: "3",
    title: "Data Science Intern",
    company: "Insight Analytics",
    category: "data",
    location: "On-site (Lagos)",
    duration: "4 months",
    stipend: "$600/month",
    description: "Analyze and visualize large datasets using Python and ML techniques.",
    skills: ["Python", "Pandas", "Machine Learning"],
  },
  {
    id: "4",
    title: "Fullstack Developer Intern",
    company: "ConnectHub",
    category: "fullstack",
    location: "Hybrid",
    duration: "5 months",
    stipend: "$650/month",
    description: "Develop fullstack applications using the MERN stack.",
    skills: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    id: "5",
    title: "Cloud Engineering Intern",
    company: "SkyScale",
    category: "cloud",
    location: "Remote",
    duration: "3 months",
    stipend: "$550/month",
    description: "Deploy scalable infrastructure using AWS and Docker.",
    skills: ["AWS", "Docker", "Terraform"],
  },
  {
    id: "6",
    title: "Cybersecurity Intern",
    company: "SecureNet",
    category: "security",
    location: "On-site (Abuja)",
    duration: "6 months",
    stipend: "$600/month",
    description: "Assist in penetration testing and security audits.",
    skills: ["Network Security", "Linux", "Ethical Hacking"],
  },
];

const InternshipsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Internships</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <Card key={internship.id} className="overflow-hidden">
            <div
              className={`h-1 ${
                internship.category === "frontend"
                  ? "bg-blue-500"
                  : internship.category === "backend"
                  ? "bg-green-500"
                  : internship.category === "data"
                  ? "bg-purple-500"
                  : internship.category === "cloud"
                  ? "bg-cyan-500"
                  : internship.category === "security"
                  ? "bg-red-500"
                  : "bg-slate-500"
              }`}
            />
            <CardHeader className="pb-2">
              <CardTitle>{internship.title}</CardTitle>
              <CardDescription>{internship.company}</CardDescription>
              <div className="mt-2 text-sm text-muted-foreground">
                {internship.location} • {internship.duration} • {internship.stipend}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{internship.description}</p>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-4">
              <Link
                href={
                  internship.id === "1"
                    ? "https://www.ziprecruiter.com/Jobs/Front-End-Developer-Internship"
                    : internship.id === "2"
                    ? "https://www.ziprecruiter.com/Jobs/Backend-Developer-Intern"
                    : internship.id === "3"
                    ? "https://www.ziprecruiter.com/Jobs/Data-Science-Intern"
                    : internship.id === "4"
                    ? "https://connecthub.io/careers/fullstack-intern"
                    : internship.id === "5"
                    ? "https://www.ziprecruiter.com/Jobs/Cloud-Engineer-Interng"
                    : internship.id === "6"
                    ? "https://www.ziprecruiter.com/Jobs/Cyber-Security-Intern"
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" className="flex gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Apply
                </Button>
              </Link>

              <Link href={`/internships/${internship.id}`}>
                <Button variant="outline">Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InternshipsPage;
