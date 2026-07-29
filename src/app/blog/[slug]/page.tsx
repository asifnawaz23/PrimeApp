import React from "react";
import { db } from "@/lib/db";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Define PageProps properly awaiting params as a Promise in Next.js 15/16
interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  const post = await db.blogPost.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  // Simple Markdown-to-JSX parser function for high-fidelity native styling
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, idx) => {
      const trimmedBlock = block.trim();
      
      if (trimmedBlock.startsWith("### ")) {
        return (
          <h3 key={idx} className="font-display font-bold text-lg md:text-xl text-white mt-8 mb-3">
            {trimmedBlock.replace("### ", "")}
          </h3>
        );
      }
      
      if (trimmedBlock.startsWith("## ")) {
        return (
          <h2 key={idx} className="font-display font-bold text-2xl md:text-3xl text-white mt-10 mb-4 border-b border-white/5 pb-2">
            {trimmedBlock.replace("## ", "")}
          </h2>
        );
      }

      if (trimmedBlock.startsWith("1. ") || trimmedBlock.startsWith("* ") || trimmedBlock.startsWith("- ")) {
        const lines = trimmedBlock.split("\n");
        const isOrdered = trimmedBlock.startsWith("1. ");
        const Tag = isOrdered ? "ol" : "ul";
        return (
          <Tag key={idx} className={`${isOrdered ? "list-decimal" : "list-disc"} pl-6 my-4 space-y-2 text-gray-300 text-sm md:text-base`}>
            {lines.map((line, lIdx) => (
              <li key={lIdx}>{line.replace(/^(\d+\.\s|[-*]\s)/, "")}</li>
            ))}
          </Tag>
        );
      }

      return (
        <p key={idx} className="text-gray-300 leading-relaxed text-sm md:text-base mb-5 font-light">
          {trimmedBlock}
        </p>
      );
    });
  };

  return (
    <div className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto z-10">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors gap-2 mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to articles
      </Link>

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex items-center text-xs font-mono text-gray-500 mb-4 gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(post.date).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Body content */}
      <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/5">
        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </div>
      </div>
    </div>
  );
}
