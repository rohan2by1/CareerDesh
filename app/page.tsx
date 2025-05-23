import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BriefcaseIcon, BuildingIcon, MapPinIcon } from "lucide-react";
import { JobCard } from "@/components/JobCard";

async function getRecentJobs() {
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
  ];
}

export default async function Home() {
  const recentJobs = await getRecentJobs();
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background pt-16 pb-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
                Find Your Perfect Career Opportunity
              </h1>
              <p className="text-xl text-muted-foreground">
                Browse through hundreds of job listings from top companies and take the next step in your career journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/jobs">
                    Browse All Jobs
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/admin/login">Employer Login</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-accent opacity-30 blur-lg"></div>
              <div className="relative overflow-hidden rounded-lg border bg-card p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <BriefcaseIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Easy Job Search</h3>
                      <p className="text-muted-foreground">Find roles matching your skills</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <BuildingIcon className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Top Companies</h3>
                      <p className="text-muted-foreground">Apply to industry leaders</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                      <MapPinIcon className="h-8 w-8 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Remote Options</h3>
                      <p className="text-muted-foreground">Find flexibility that fits you</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Featured Job Opportunities</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Explore our hand-picked selection of the latest job openings from top employers
            </p>
          </div>
          
          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/jobs">View All Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Finding your next career opportunity is simple and straightforward
            </p>
          </div>
          
          <div className="grid gap-8 mt-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse Jobs</h3>
              <p className="text-muted-foreground">
                Explore our extensive collection of job listings from various industries and locations.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Find a Match</h3>
              <p className="text-muted-foreground">
                Discover opportunities that align with your skills, experience, and career aspirations.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply Directly</h3>
              <p className="text-muted-foreground">
                Submit your application through our platform and take the first step towards your new role.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
