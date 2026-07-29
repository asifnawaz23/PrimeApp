import React from "react";
import { db } from "@/lib/db";
import { seedDatabaseIfNeeded } from "@/lib/seedData";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import type { BlogPost } from "@prisma/client";

export const metadata: Metadata = {
  title: "Engineering Blog",
  description: "Read technical articles, engineering blueprints, and software development guides written by Prime App Solutions engineers.",
};

export const revalidate = 60; // Cache for 60 seconds

export default async function BlogPage() {
  await seedDatabaseIfNeeded();
  let posts: BlogPost[] = [];

  try {
    posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
    });
  } catch (error) {
    console.error("Failed to query blog posts:", error);
  }

  return (
    <div className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center space-x-1.5 py-1 px-3 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 text-xs text-accent-cyan font-semibold uppercase tracking-wider mb-6">
          <span>Engineering Notes</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6">
          The Prime App <br />
          <span className="gradient-text-electric">Technical Blog</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
          Deep dives into software architecture, WebGL interactive designs, smart contract security standards, and private LLM scaling.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="glass-card rounded-2xl p-6 flex flex-col justify-between group">
            <div>
              <div className="flex items-center text-xs font-mono text-gray-500 mb-4 gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(post.date).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
              </div>

              <h2 className="font-display font-bold text-xl text-white mb-3 group-hover:text-accent-cyan transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {post.summary}
              </p>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="text-xs font-semibold uppercase tracking-wider text-accent-cyan hover:text-accent-violet flex items-center gap-1 group/btn transition-colors mt-auto"
            >
              Read Full Article
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
