"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboardIcon,
  ListPlusIcon,
  ClipboardListIcon,
  Settings2Icon,
  LogOutIcon,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };
  
  return (
    <div className="min-h-screen border-r bg-muted/20 w-64 flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold">JobBoard Admin</h2>
      </div>
      
      <nav className="flex-1 px-3 py-2 space-y-1">
        <Link href="/admin/dashboard">
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/dashboard") ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            <LayoutDashboardIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </div>
        </Link>
        
        <Link href="/admin/jobs">
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/jobs") ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            <ClipboardListIcon className="h-5 w-5" />
            <span>Manage Jobs</span>
          </div>
        </Link>
        
        <Link href="/admin/jobs/new">
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/jobs/new") ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            <ListPlusIcon className="h-5 w-5" />
            <span>Add New Job</span>
          </div>
        </Link>
        
        <Link href="/admin/settings">
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/settings") ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          >
            <Settings2Icon className="h-5 w-5" />
            <span>Settings</span>
          </div>
        </Link>
      </nav>
      
      <div className="p-4 border-t">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 justify-start"
          onClick={handleSignOut}
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
