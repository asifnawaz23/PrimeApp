"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, MessageSquare, User } from "lucide-react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

interface TestimonialsManagerProps {
  initialTestimonials: Testimonial[];
}

const AVATAR_OPTIONS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Beta",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Gamma",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Delta",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon",
];

export default function TestimonialsManager({ initialTestimonials }: TestimonialsManagerProps) {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    avatar: AVATAR_OPTIONS[0],
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createTestimonial(form);
      setTestimonials((prev) => [res as Testimonial, ...prev]);
      setIsCreating(false);
      setForm({ name: "", role: "", company: "", content: "", avatar: AVATAR_OPTIONS[0] });
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create testimonial.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: string) => {
    const t = testimonials.find((t) => t.id === id);
    if (!t) return;
    setIsSubmitting(true);
    try {
      await updateTestimonial(id, {
        name: t.name,
        role: t.role,
        company: t.company,
        content: t.content,
        avatar: t.avatar,
      });
      setEditingId(null);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update testimonial.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete testimonial.");
    }
  };

  const updateField = (id: string, field: keyof Testimonial, value: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const AvatarPicker = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Avatar (preset or custom URL)</label>
      <div className="flex gap-2 mb-2">
        {AVATAR_OPTIONS.map((url) => (
          <button
            type="button"
            key={url}
            onClick={() => onChange(url)}
            className={`w-9 h-9 rounded-full border-2 overflow-hidden transition-all ${
              value === url ? "border-accent-cyan scale-110" : "border-white/10 opacity-60 hover:opacity-100"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="avatar option" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 px-3 glass-input text-xs font-mono"
        placeholder="or paste a custom avatar URL..."
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Testimonials</h1>
          <p className="text-gray-500 text-xs mt-0.5">{testimonials.length} review{testimonials.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-gradient-to-r from-accent-violet to-accent-cyan text-bg-base font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isCreating ? "Cancel" : "Add Testimonial"}
        </button>
      </div>

      {/* Creation Form */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="glass-card rounded-xl p-6 border border-white/5 space-y-4"
        >
          <h2 className="font-display font-bold text-white text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-accent-cyan" /> New Testimonial
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Client Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="e.g. Sarah Johnson"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Role / Title</label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="e.g. CTO"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Company</label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="e.g. TechVentures Inc."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Testimonial</label>
            <textarea
              required
              rows={3}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full py-2 px-3 glass-input text-xs leading-relaxed"
              placeholder="The client's feedback in their own words..."
            />
          </div>

          <AvatarPicker value={form.avatar} onChange={(v) => setForm({ ...form, avatar: v })} />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-accent-cyan text-bg-base font-bold rounded text-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Add Testimonial"}
            </button>
          </div>
        </form>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.length === 0 && (
          <div className="md:col-span-2 glass-card rounded-xl p-10 border border-white/5 flex flex-col items-center justify-center gap-3 text-center">
            <MessageSquare className="w-8 h-8 text-gray-600" />
            <p className="text-gray-500 text-sm">No testimonials yet. Add your first review.</p>
          </div>
        )}

        {testimonials.map((t) => {
          const isEditing = editingId === t.id;
          return (
            <div
              key={t.id}
              className="glass-card rounded-xl p-5 border border-white/5 space-y-4 relative"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full border border-white/10 bg-bg-ink object-cover shrink-0"
                  />
                  <div>
                    {isEditing ? (
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={t.name}
                          onChange={(e) => updateField(t.id, "name", e.target.value)}
                          className="w-full py-1 px-2 glass-input text-xs font-bold"
                          placeholder="Name"
                        />
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={t.role}
                            onChange={(e) => updateField(t.id, "role", e.target.value)}
                            className="w-full py-1 px-2 glass-input text-xs"
                            placeholder="Role"
                          />
                          <input
                            type="text"
                            value={t.company}
                            onChange={(e) => updateField(t.id, "company", e.target.value)}
                            className="w-full py-1 px-2 glass-input text-xs"
                            placeholder="Company"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold text-white text-sm">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.role} · {t.company}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleUpdate(t.id)}
                        disabled={isSubmitting}
                        className="p-1.5 rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan hover:text-bg-base transition-colors cursor-pointer disabled:opacity-50"
                        title="Save"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1.5 rounded bg-white/5 border border-white/10 hover:text-white transition-colors cursor-pointer"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingId(t.id)}
                        className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-1.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Content */}
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={t.content}
                    onChange={(e) => updateField(t.id, "content", e.target.value)}
                    className="w-full py-1.5 px-3 glass-input text-xs leading-relaxed"
                  />
                  <input
                    type="text"
                    value={t.avatar}
                    onChange={(e) => updateField(t.id, "avatar", e.target.value)}
                    className="w-full py-1.5 px-3 glass-input text-xs font-mono"
                    placeholder="Avatar URL"
                  />
                </div>
              ) : (
                <blockquote className="text-gray-400 text-xs leading-relaxed italic border-l-2 border-accent-violet/40 pl-3">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
