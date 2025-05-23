"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    siteName: "JobBoard",
    siteDescription: "Find your next career opportunity",
    adminEmail: "admin@example.com",
    mongoDbUri: process.env.MONGODB_URI || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Saving settings:", formData);
      
      // In a real app, this would update your settings via API
      
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your job board settings
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={formData.siteDescription}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mongoDbUri">MongoDB Connection URI</Label>
                  <Input
                    id="mongoDbUri"
                    name="mongoDbUri"
                    value={formData.mongoDbUri}
                    onChange={handleChange}
                    required
                    type="password"
                  />
                  <p className="text-sm text-muted-foreground">
                    Update your MongoDB connection string (stored in .env.local)
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Settings"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Update your admin account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success("Password updated successfully")}>
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
