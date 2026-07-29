"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, FileText, Eye, EyeOff } from "lucide-react";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  published: boolean;
  date: Date;
}

interface BlogManagerProps {
  initialPosts: BlogPost[];
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogManager({ initialPosts }: BlogManagerProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    published: false,
  });

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({ ...prev, title, slug: slugify(title) }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createBlogPost(form);
      setPosts((prev) => [res as BlogPost, ...prev]);
      setIsCreating(false);
      setForm({ title: "", slug: "", summary: "", content: "", published: false });
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create blog post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: string) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    setIsSubmitting(true);
    try {
      await updateBlogPost(id, {
        title: post.title,
        slug: post.slug,
        summary: post.summary,
        content: post.content,
        published: post.published,
      });
      setEditingId(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update blog post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post? This action cannot be undone.")) return;
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog post.");
    }
  };

  const updatePostField = (id: string, field: keyof BlogPost, value: string | boolean) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Blog Posts</h1>
          <p className="text-gray-500 text-xs mt-0.5">{posts.length} article{posts.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-gradient-to-r from-accent-violet to-accent-cyan text-bg-base font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isCreating ? "Cancel" : "New Post"}
        </button>
      </div>

      {/* Creation Form */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="glass-card rounded-xl p-6 border border-white/5 space-y-4"
        >
          <h2 className="font-display font-bold text-white text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent-cyan" /> New Blog Post
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="e.g. Why Mobile-First Wins in 2025"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Slug (URL)</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs font-mono"
                placeholder="auto-generated-from-title"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Summary / Meta Description</label>
            <textarea
              required
              rows={2}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full py-2 px-3 glass-input text-xs"
              placeholder="A concise 1-2 sentence description for SEO and previews..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Content (Markdown)</label>
            <textarea
              required
              rows={8}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full py-2 px-3 glass-input text-xs font-mono leading-relaxed"
              placeholder="## Introduction&#10;&#10;Write your article in Markdown format..."
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setForm({ ...form, published: !form.published })}
                className={`w-10 h-5 rounded-full transition-colors ${form.published ? "bg-accent-cyan" : "bg-white/10"} relative`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${form.published ? "translate-x-5" : ""}`} />
              </div>
              <span className="text-xs font-semibold text-gray-400">
                {form.published ? "Published" : "Draft"}
              </span>
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-accent-cyan text-bg-base font-bold rounded text-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Create Post"}
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 && (
          <div className="glass-card rounded-xl p-10 border border-white/5 flex flex-col items-center justify-center gap-3 text-center">
            <FileText className="w-8 h-8 text-gray-600" />
            <p className="text-gray-500 text-sm">No blog posts yet. Create your first one.</p>
          </div>
        )}

        {posts.map((post) => {
          const isEditing = editingId === post.id;
          return (
            <div key={post.id} className="glass-card rounded-xl p-6 border border-white/5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow space-y-3">
                  {/* Title */}
                  {isEditing ? (
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) => updatePostField(post.id, "title", e.target.value)}
                      className="w-full py-1.5 px-3 glass-input text-sm font-bold"
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          post.published
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}
                      >
                        {post.published ? "Live" : "Draft"}
                      </span>
                      <h3 className="font-display font-bold text-white text-base">{post.title}</h3>
                    </div>
                  )}

                  {/* Slug */}
                  {isEditing ? (
                    <input
                      type="text"
                      value={post.slug}
                      onChange={(e) => updatePostField(post.id, "slug", e.target.value)}
                      className="w-full py-1 px-2.5 glass-input text-xs font-mono"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs font-mono">/{post.slug}</span>
                  )}

                  {/* Summary */}
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={post.summary}
                      onChange={(e) => updatePostField(post.id, "summary", e.target.value)}
                      className="w-full py-1.5 px-3 glass-input text-xs"
                    />
                  ) : (
                    <p className="text-gray-400 text-xs leading-relaxed max-w-3xl">{post.summary}</p>
                  )}

                  {/* Content (only show in edit mode) */}
                  {isEditing && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Content (Markdown)</label>
                      <textarea
                        rows={6}
                        value={post.content}
                        onChange={(e) => updatePostField(post.id, "content", e.target.value)}
                        className="w-full py-1.5 px-3 glass-input text-xs font-mono"
                      />
                    </div>
                  )}

                  {/* Published toggle */}
                  {isEditing && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => updatePostField(post.id, "published", !post.published)}
                        className={`w-10 h-5 rounded-full transition-colors ${post.published ? "bg-accent-cyan" : "bg-white/10"} relative`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${post.published ? "translate-x-5" : ""}`} />
                      </div>
                      <span className="text-xs text-gray-400">{post.published ? "Published" : "Draft"}</span>
                    </label>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleUpdate(post.id)}
                        disabled={isSubmitting}
                        className="p-2 rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan hover:text-bg-base transition-colors cursor-pointer disabled:opacity-50"
                        title="Save Changes"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-2 rounded bg-white/5 border border-white/10 hover:text-white transition-colors cursor-pointer"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingId(post.id)}
                        className="p-2 rounded bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
