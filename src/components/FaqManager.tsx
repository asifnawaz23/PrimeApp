"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, HelpCircle } from "lucide-react";
import { createFAQ, updateFAQ, deleteFAQ } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface FaqManagerProps {
  initialFaqs: FAQ[];
}

export default function FaqManager({ initialFaqs }: FaqManagerProps) {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    order: faqs.length + 1,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createFAQ({ ...form, order: Number(form.order) });
      setFaqs((prev) => [...prev, res as FAQ].sort((a, b) => a.order - b.order));
      setIsCreating(false);
      setForm({ question: "", answer: "", order: faqs.length + 2 });
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create FAQ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: string) => {
    const faq = faqs.find((f) => f.id === id);
    if (!faq) return;
    setIsSubmitting(true);
    try {
      await updateFAQ(id, {
        question: faq.question,
        answer: faq.answer,
        order: Number(faq.order),
      });
      setEditingId(null);
      setFaqs((prev) => [...prev].sort((a, b) => a.order - b.order));
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update FAQ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await deleteFAQ(id);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete FAQ.");
    }
  };

  const updateField = (id: string, field: keyof FAQ, value: string | number) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">FAQs</h1>
          <p className="text-gray-500 text-xs mt-0.5">{faqs.length} question{faqs.length !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-gradient-to-r from-accent-violet to-accent-cyan text-bg-base font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isCreating ? "Cancel" : "Add FAQ"}
        </button>
      </div>

      {/* Creation Form */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="glass-card rounded-xl p-6 border border-white/5 space-y-4 max-w-2xl"
        >
          <h2 className="font-display font-bold text-white text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-accent-cyan" /> New FAQ
          </h2>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Question</label>
              <input
                type="text"
                required
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="e.g. What technologies do you specialize in?"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Order</label>
              <input
                type="number"
                required
                min={1}
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full py-2 px-3 glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Answer</label>
            <textarea
              required
              rows={4}
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              className="w-full py-2 px-3 glass-input text-xs leading-relaxed"
              placeholder="Provide a clear, helpful answer..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-accent-cyan text-bg-base font-bold rounded text-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Create FAQ"}
            </button>
          </div>
        </form>
      )}

      {/* FAQ List */}
      <div className="space-y-3">
        {faqs.length === 0 && (
          <div className="glass-card rounded-xl p-10 border border-white/5 flex flex-col items-center justify-center gap-3 text-center">
            <HelpCircle className="w-8 h-8 text-gray-600" />
            <p className="text-gray-500 text-sm">No FAQs yet. Add your first question.</p>
          </div>
        )}

        {faqs.map((faq) => {
          const isEditing = editingId === faq.id;
          return (
            <div
              key={faq.id}
              className="glass-card rounded-xl p-5 border border-white/5 flex gap-4"
            >
              {/* Order badge */}
              <div className="shrink-0">
                {isEditing ? (
                  <input
                    type="number"
                    min={1}
                    value={faq.order}
                    onChange={(e) => updateField(faq.id, "order", Number(e.target.value))}
                    className="w-14 py-1 px-2 glass-input text-xs text-center font-mono"
                  />
                ) : (
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-violet/10 border border-accent-violet/20 text-accent-violet text-xs font-bold font-mono">
                    {faq.order}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-grow space-y-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateField(faq.id, "question", e.target.value)}
                      className="w-full py-1.5 px-3 glass-input text-sm font-semibold"
                    />
                    <textarea
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => updateField(faq.id, "answer", e.target.value)}
                      className="w-full py-1.5 px-3 glass-input text-xs leading-relaxed"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-white text-sm">{faq.question}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{faq.answer}</p>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 shrink-0 self-start mt-0.5">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleUpdate(faq.id)}
                      disabled={isSubmitting}
                      className="p-2 rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan hover:text-bg-base transition-colors cursor-pointer disabled:opacity-50"
                      title="Save"
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
                      onClick={() => setEditingId(faq.id)}
                      className="p-2 rounded bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
