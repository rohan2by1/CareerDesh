"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

// Mock function to get job data
const getJobById = async (id: string) => {
  // In a real app, this would fetch from your API
  // This is just mock data for demonstration
  return {
    _id: id,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    description: "We are looking for a Senior Frontend Developer to join our dynamic team. As a Senior Frontend Developer, you will be responsible for implementing visual elements that users see and interact with in the web application.",
    requirements: ["5+ years of experience in frontend development", "Expertise in JavaScript, HTML, CSS, and frontend frameworks", "Experience with responsive and adaptive design"],
    applyLink: "https://example.com/apply",
    salary: "$120,000 - $150,000",
    deadline: "2024-12-31",
    isActive: true,
  };
};

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // Since this is a client component ("use client"), we can directly access params.id
  // In client components, params is still synchronous
  const { id } = params;
  
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
    isActive: true,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJobById(id);
        setFormData({
          ...jobData,
          requirements: jobData.requirements.join('\n'),
          deadline: jobData.deadline || "",
        });
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to load job data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJob();
  }, [id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Updating job data:", formData);
      
      // In a real app, this would be an API call to update the job
      // const response = await fetch(`/api/jobs/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     requirements: formData.requirements.split('\n').filter(Boolean),
      //   }),
      // });
      
      // if (!response.ok) throw new Error('Failed to update job');
      
      toast.success("Job updated successfully");
      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <p>Loading job data...</p>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Job</h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Update the information for this job listing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-end space-x-2">
                <Label htmlFor="isActive" className="text-sm font-medium">
                  Job Status: {formData.isActive ? "Active" : "Inactive"}
                </Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
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
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
}
