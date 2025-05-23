"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PencilIcon, SearchIcon, TrashIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

// Mock job data
const mockJobs = [
  {
    _id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    postedDate: new Date().toISOString(),
    isActive: true,
  },
  {
    _id: "2",
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Austin, TX",
    type: "Full-time",
    postedDate: new Date().toISOString(),
    isActive: true,
  },
  {
    _id: "3",
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Contract",
    postedDate: new Date().toISOString(),
    isActive: false,
  },
  {
    _id: "4",
    title: "Product Manager",
    company: "InnovateCo",
    location: "New York, NY",
    type: "Full-time",
    postedDate: new Date().toISOString(),
    isActive: true,
  },
  {
    _id: "5",
    title: "Backend Developer",
    company: "DataSystems",
    location: "Remote",
    type: "Full-time",
    postedDate: new Date().toISOString(),
    isActive: true,
  },
];

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // In a real app, this would filter from API
  };
  
  const handleToggleStatus = (id: string) => {
    console.log("Toggling status for job:", id);
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job._id === id ? { ...job, isActive: !job.isActive } : job
      )
    );
    toast.success("Job status updated");
  };
  
  const handleDeleteJob = (id: string) => {
    console.log("Deleting job:", id);
    setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
    toast.success("Job deleted successfully");
  };
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Jobs</h1>
          <Button asChild>
            <Link href="/admin/jobs/new">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Job
            </Link>
          </Button>
        </div>
        
        <div className="bg-card border rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search job titles or companies"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        
        <div className="bg-card border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant={job.type === "Full-time" ? "default" : "outline"}>
                      {job.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={job.isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleStatus(job._id)}
                    >
                      {job.isActive ? "Active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/jobs/edit/${job._id}`}>
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Job</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this job? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteJob(job._id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
