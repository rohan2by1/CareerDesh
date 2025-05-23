"use client";

import { AdminSidebar } from "@/components/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon, UsersIcon, ActivityIcon, TrendingUpIcon } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+6 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <ActivityIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,453</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Listings</CardTitle>
              <CardDescription>
                Your most recently added jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Senior Frontend Developer", company: "TechCorp", date: "2 days ago" },
                  { title: "DevOps Engineer", company: "CloudSystems", date: "4 days ago" },
                  { title: "UX/UI Designer", company: "DesignStudio", date: "6 days ago" },
                  { title: "Product Manager", company: "InnovateCo", date: "1 week ago" },
                ].map((job, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-muted-foreground">{job.company}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{job.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Popular Job Categories</CardTitle>
              <CardDescription>
                Categories with the most job postings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Engineering", count: 12 },
                  { name: "Design", count: 8 },
                  { name: "Product", count: 6 },
                  { name: "Marketing", count: 4 },
                  { name: "Operations", count: 3 },
                ].map((category, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="font-medium">{category.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="bg-primary h-2" style={{ width: `${category.count * 8}px` }}></div>
                      <span className="text-sm text-muted-foreground">{category.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
