"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { BriefcaseIcon, MenuIcon, XIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { useState } from "react";

export function NavBar() {
  console.log("NavBar component rendered with updated SheetContent");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  const closeSheet = () => setOpen(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BriefcaseIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JobBoard</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
            Home
          </Link>
          <Link 
            href="/jobs" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/jobs") ? "text-primary" : "text-muted-foreground"}`}>
            Browse Jobs
          </Link>
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link href="/admin/login">Admin</Link>
          </Button>
        </nav>
        
        {/* Mobile navigation */}
        <Sheet open={open} onOpenChange={setOpen} aria-label="Navigation Menu">
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px]">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Access site sections and settings</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-6 pt-6">
              <Link 
                href="/" 
                onClick={closeSheet}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
                Home
              </Link>
              <Link 
                href="/jobs" 
                onClick={closeSheet}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/jobs") ? "text-primary" : "text-muted-foreground"}`}>
                Browse Jobs
              </Link>
              <ModeToggle />
              <Button variant="outline" asChild>
                <Link href="/admin/login" onClick={closeSheet}>Admin</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
