import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, BuildingIcon, CalendarIcon, ClockIcon, ExternalLinkIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

async function getJobDetails(id: string) {
  // In a real app, this would fetch from your API based on the ID
  // For now, we'll return mock data
  return {
    _id: id,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    postedDate: new Date().toISOString(),
    salary: "$120,000 - $150,000",
    description: `<div class="job-description">
      <h2>About the Role</h2>
      <p>We are looking for a Senior Frontend Developer to join our dynamic team. As a Senior Frontend Developer, you will be responsible for implementing visual elements that users see and interact with in the web application.</p>
      
      <h2>Responsibilities</h2>
      <ul>
        <li>Develop new user-facing features using React.js</li>
        <li>Build reusable components and libraries for future use</li>
        <li>Translate designs and wireframes into high-quality code</li>
        <li>Optimize components for maximum performance across devices and browsers</li>
        <li>Collaborate with backend developers and designers</li>
      </ul>
      
      <h2>Requirements</h2>
      <ul>
        <li>5+ years of experience in frontend development</li>
        <li>Expertise in JavaScript, HTML, CSS, and frontend frameworks (React, Vue, Angular)</li>
        <li>Experience with responsive and adaptive design</li>
        <li>Familiarity with RESTful APIs and modern frontend build pipelines</li>
        <li>Understanding of server-side rendering and its benefits</li>
        <li>Excellent problem-solving skills and attention to detail</li>
      </ul>
      
      <h2>Benefits</h2>
      <ul>
        <li>Competitive salary package</li>
        <li>Health, dental, and vision insurance</li>
        <li>401(k) matching</li>
        <li>Flexible working hours</li>
        <li>Remote work options</li>
        <li>Professional development budget</li>
        <li>Paid time off and company holidays</li>
      </ul>
    </div>`,
    requirements: [
      "5+ years of experience in frontend development",
      "Expertise in JavaScript, HTML, CSS, and frontend frameworks",
      "Experience with responsive and adaptive design",
    ],
    applyLink: "https://example.com/apply",
    deadline: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    isActive: true,
  };
}

// Using Next.js 15 proper typing for params
type Props = {
  params: Promise<{ id: string }> | { id: string } | any;
};

export default async function JobDetailPage({ params }: Props) {
  // Properly await the params object to get the id
  const { id } = await params;
  const job = await getJobDetails(id);
  
  return (
    <div className="container py-10">
      <Link href="/jobs" className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to all jobs
      </Link>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <Badge variant={job.type === "Full-time" ? "default" : job.type === "Part-time" ? "secondary" : "outline"}>
                {job.type}
              </Badge>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center text-muted-foreground gap-2">
                <BuildingIcon className="h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center text-muted-foreground gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
              </div>
              {job.deadline && (
                <div className="flex items-center text-muted-foreground gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>Apply before {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>
        </div>
        
        <div>
          <Card className="p-6 sticky top-24">
            {job.salary && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Salary Range</h3>
                <p className="text-xl font-semibold text-primary">{job.salary}</p>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Key Requirements</h3>
              <ul className="list-disc pl-5 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <Button className="w-full gap-2" size="lg" asChild>
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
