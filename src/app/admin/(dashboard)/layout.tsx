import React from "react";
import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Inbox,
  Globe,
  Briefcase,
  FileText,
  HelpCircle,
  MessageSquare,
  Terminal,
  LayoutDashboard,
} from "lucide-react";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side session verification
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const menuItems = [
    { name: "Overview", href: "/admin/overview", icon: LayoutDashboard },
    { name: "Inquiries", href: "/admin/inquiries", icon: Inbox },
    { name: "Services", href: "/admin/services", icon: Globe },
    { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "FAQs", href: "/admin/faq", icon: HelpCircle },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-bg-base text-gray-200">
      {/* Sidebar navigation */}
      <aside className="w-64 border-r border-white/5 bg-bg-ink/50 backdrop-blur-md flex flex-col justify-between p-6">
        <div>
          {/* Dashboard Logo */}
          <div className="flex items-center space-x-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-violet to-accent-cyan p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-bg-base rounded-[7px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-accent-cyan" />
              </div>
            </div>
            <span className="font-display font-bold text-white text-base">
              Admin Panel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Icon className="w-4.5 h-4.5 text-accent-cyan" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout container */}
        <div className="pt-6 border-t border-white/5">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main content scroll area */}
      <main className="flex-grow flex flex-col">
        {/* Header bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-bg-ink/20">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-gray-500">// ACTIVE SESSION</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-accent-cyan hover:underline"
          >
            Visit Public Site &rarr;
          </Link>
        </header>

        <div className="flex-grow p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
