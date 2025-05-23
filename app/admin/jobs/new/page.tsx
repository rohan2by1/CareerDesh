"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function NewJobPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    applyLink: "",
    salary: "",
    deadline: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Submitting job data:", formData);
      
      // In a real app, this would be an API call to save the job
      // const response = await fetch('/api/jobs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     requirements: formData.requirements.split('\n').filter(Boolean),
      //   }),
      // });
      
      // if (!response.ok) throw new Error('Failed to create job');
      
      toast.success("Job created successfully");
      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Failed to create job");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Add New Job</h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Enter the information for the new job listing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="e.g. TechCorp"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. San Francisco, CA (Remote)"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range (Optional)</Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g. $80,000 - $100,000"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline (Optional)</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="applyLink">Application Link</Label>
                  <Input
                    id="applyLink"
                    name="applyLink"
                    placeholder="e.g. https://example.com/apply"
                    value={formData.applyLink}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter job description with details about the role, responsibilities, and benefits..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="min-h-32"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Enter job requirements, one per line..."
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  className="min-h-32"
                />
                <p className="text-sm text-muted-foreground">
                  Add each requirement on a new line
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Job"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
}
