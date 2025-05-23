import { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Admin Dashboard - JobBoard",
  description: "Manage job listings and view application statistics",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
