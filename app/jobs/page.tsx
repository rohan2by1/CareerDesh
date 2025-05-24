import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

async function getJobs() {
  // In a real app, this would fetch from your API
  // For now, we'll return mock data
  return [
    {
      _id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      postedDate: new Date().toISOString(),
      salary: "$120,000 - $150,000",
    },
    {
      _id: "2",
      title: "DevOps Engineer",
      company: "CloudSystems",
      location: "Austin, TX",
      type: "Full-time",
      postedDate: new Date().toISOString(),
      salary: "$110,000 - $140,000",
    },
    {
      _id: "3",
      title: "UX/UI Designer",
      company: "DesignStudio",
      location: "Remote",
      type: "Contract",
      postedDate: new Date().toISOString(),
      salary: "$90,000 - $120,000",
    },
    {
      _id: "4",
      title: "Product Manager",
      company: "InnovateCo",
      location: "New York, NY",
      type: "Full-time",
      postedDate: new Date().toISOString(),
      salary: "$130,000 - $160,000",
    },
    {
      _id: "5",
      title: "Backend Developer",
      company: "DataSystems",
      location: "Remote",
      type: "Full-time",
      postedDate: new Date().toISOString(),
      salary: "$115,000 - $145,000",
    },
    {
      _id: "6",
      title: "Marketing Specialist",
      company: "GrowthHackers",
      location: "Chicago, IL (Hybrid)",
      type: "Part-time",
      postedDate: new Date().toISOString(),
      salary: "$70,000 - $90,000",
    },
  ];
}

export default async function JobsPage() {
  const jobs = await getJobs();
  
  return (
    <div className="container py-10">
      <div className="p-2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Browse Job Listings</h1>
        <p className="text-muted-foreground text-lg">Find your next career opportunity from our curated list of jobs</p>
        
        {/* Search and Filter Section */}
        <div className="mt-6 mb-10 p-6 bg-card border rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search job titles, companies, or keywords" 
                  className="pl-9" 
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Search</Button>
            </div>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
