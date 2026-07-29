import React from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  Inbox,
  Globe,
  Briefcase,
  FileText,
  HelpCircle,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Overview — Prime App Admin",
};

async function getStats() {
  const [inquiries, services, portfolio, blog, faqs, testimonials] = await Promise.all([
    db.inquiry.count(),
    db.service.count(),
    db.portfolio.count(),
    db.blogPost.count(),
    db.faq.count(),
    db.testimonial.count(),
  ]);

  const recentInquiries = await db.inquiry.findMany({
    orderBy: { date: "desc" },
    take: 5,
  });

  const publishedPosts = await db.blogPost.count({ where: { published: true } });

  return {
    inquiries,
    services,
    portfolio,
    blog,
    faqs,
    testimonials,
    recentInquiries,
    publishedPosts,
  };
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const statCards = [
    {
      label: "Total Inquiries",
      value: stats.inquiries,
      icon: Inbox,
      href: "/admin/inquiries",
      color: "from-accent-violet to-accent-cyan",
      desc: "Client messages received",
    },
    {
      label: "Services",
      value: stats.services,
      icon: Globe,
      href: "/admin/services",
      color: "from-blue-500 to-cyan-400",
      desc: "Offering categories",
    },
    {
      label: "Portfolio Items",
      value: stats.portfolio,
      icon: Briefcase,
      href: "/admin/portfolio",
      color: "from-purple-500 to-pink-400",
      desc: "Case studies & projects",
    },
    {
      label: "Blog Posts",
      value: stats.blog,
      icon: FileText,
      href: "/admin/blog",
      color: "from-emerald-500 to-teal-400",
      desc: `${stats.publishedPosts} published`,
    },
    {
      label: "FAQs",
      value: stats.faqs,
      icon: HelpCircle,
      href: "/admin/faq",
      color: "from-orange-500 to-amber-400",
      desc: "Help center questions",
    },
    {
      label: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "from-rose-500 to-pink-400",
      desc: "Client reviews",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="font-display font-bold text-3xl text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Prime App Solutions — content management system.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="glass-card rounded-xl p-5 border border-white/5 group hover:border-white/10 transition-all duration-200 flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.color} p-[1px] flex items-center justify-center`}
                >
                  <div className="w-full h-full bg-bg-ink rounded-[7px] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <p className="text-3xl font-display font-black text-white">
                  {card.value}
                </p>
                <p className="text-white text-xs font-semibold mt-0.5">{card.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{card.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inquiries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-cyan" />
            Recent Inquiries
          </h2>
          <Link
            href="/admin/inquiries"
            className="text-xs text-accent-cyan hover:underline font-semibold"
          >
            View all →
          </Link>
        </div>

        {stats.recentInquiries.length === 0 ? (
          <div className="glass-card rounded-xl p-8 border border-white/5 text-center">
            <Inbox className="w-7 h-7 text-gray-600 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No inquiries yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {stats.recentInquiries.map((inq) => (
              <div
                key={inq.id}
                className="glass-card rounded-lg px-5 py-3.5 border border-white/5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">
                      {inq.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold truncate">{inq.name}</p>
                    <p className="text-gray-500 text-xs truncate">{inq.email}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-gray-400 text-xs truncate max-w-[200px]">{inq.service}</p>
                  <p className="text-gray-600 text-[10px] font-mono mt-0.5">
                    {new Date(inq.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="space-y-3">
        <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent-violet" />
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "New Blog Post", href: "/admin/blog" },
            { label: "Add Portfolio Item", href: "/admin/portfolio" },
            { label: "Edit Services", href: "/admin/services" },
            { label: "Add FAQ", href: "/admin/faq" },
            { label: "Add Testimonial", href: "/admin/testimonials" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="px-4 py-2 glass-card rounded-lg border border-white/5 text-xs font-semibold text-gray-300 hover:text-white hover:border-accent-cyan/30 transition-all duration-200"
            >
              + {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
