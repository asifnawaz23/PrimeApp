"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Eye } from "lucide-react";
import { createPortfolio, updatePortfolio, deletePortfolio } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface PortfolioItem {
  id: string;
  title: string;
  tags: string;
  tech: string;
  link: string | null;
  image: string;
  featured: boolean;
}

interface PortfolioManagerProps {
  initialItems: PortfolioItem[];
}

export default function PortfolioManager({ initialItems }: PortfolioManagerProps) {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [form, setForm] = useState({
    title: "",
    tags: "",
    tech: "",
    link: "",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800",
    featured: false,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createPortfolio(form);
      setItems((prev) => [...prev, res]);
      setIsCreating(false);
      setForm({ title: "", tags: "", tech: "", link: "", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800", featured: false });
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create portfolio item.");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      await updatePortfolio(id, {
        title: item.title,
        tags: item.tags,
        tech: item.tech,
        link: item.link || "",
        image: item.image,
        featured: item.featured,
      });
      setEditingId(null);
      router.refresh();
      alert("Portfolio updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update portfolio.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this case study?")) {
      try {
        await deletePortfolio(id);
        setItems((prev) => prev.filter((i) => i.id !== id));
        router.refresh();
      } catch (err) {
        console.error(err);
        alert("Failed to delete portfolio.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl text-white">Manage Portfolio</h1>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-gradient-to-r from-accent-violet to-accent-cyan text-bg-base font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-90"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isCreating ? "Cancel" : "Add Case Study"}
        </button>
      </div>

      {/* Creation Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="glass-card rounded-xl p-6 border border-white/5 space-y-4 max-w-xl">
          <h2 className="font-display font-bold text-white text-sm">New Case Study</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Project Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="e.g. DeFi Staking Hub"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">External Link</label>
              <input
                type="text"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Tags (Comma-separated)</label>
              <input
                type="text"
                required
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="e.g. Blockchain, FinTech"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Tech Used (Comma-separated)</label>
              <input
                type="text"
                required
                value={form.tech}
                onChange={(e) => setForm({ ...form, tech: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="Solidity, Next.js, Tailwind..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Image URL</label>
            <input
              type="text"
              required
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full py-2 px-3 glass-input text-xs"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 text-accent-cyan bg-bg-base border-white/10 rounded cursor-pointer"
            />
            <label htmlFor="featured" className="text-xs font-semibold text-gray-300 cursor-pointer">
              Feature on Homepage
            </label>
          </div>

          <button type="submit" className="px-4 py-2 bg-accent-cyan text-bg-base font-bold rounded text-xs cursor-pointer">
            Create Portfolio Item
          </button>
        </form>
      )}

      {/* Items List */}
      <div className="space-y-4">
        {items.map((item) => {
          const isEditing = editingId === item.id;
          return (
            <div key={item.id} className="glass-card rounded-xl p-6 border border-white/5 flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-grow space-y-3">
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((i) => (i.id === item.id ? { ...i, title: e.target.value } : i))
                        )
                      }
                      className="py-1 px-2.5 glass-input text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={item.link || ""}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((i) => (i.id === item.id ? { ...i, link: e.target.value } : i))
                        )
                      }
                      placeholder="Link"
                      className="py-1 px-2.5 glass-input text-xs"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    {item.featured && (
                      <span className="px-2 py-0.5 rounded bg-accent-indigo/10 text-accent-indigo text-[10px] font-mono font-bold uppercase">
                        Featured
                      </span>
                    )}
                    <h3 className="font-display font-bold text-white text-base">{item.title}</h3>
                  </div>
                )}

                {isEditing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={item.tags}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((i) => (i.id === item.id ? { ...i, tags: e.target.value } : i))
                        )
                      }
                      placeholder="Tags"
                      className="py-1 px-2.5 glass-input text-xs"
                    />
                    <input
                      type="text"
                      value={item.tech}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((i) => (i.id === item.id ? { ...i, tech: e.target.value } : i))
                        )
                      }
                      placeholder="Tech Used"
                      className="py-1 px-2.5 glass-input text-xs"
                    />
                  </div>
                ) : (
                  <div className="text-xs space-y-1">
                    <div className="text-gray-400">
                      Tags: <span className="text-accent-cyan font-mono">{item.tags}</span>
                    </div>
                    <div className="text-gray-500">
                      Tech: <span className="font-mono">{item.tech}</span>
                    </div>
                  </div>
                )}

                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((i) => (i.id === item.id ? { ...i, image: e.target.value } : i))
                        )
                      }
                      placeholder="Image URL"
                      className="w-full py-1 px-2.5 glass-input text-xs"
                    />
                    <label className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.featured}
                        onChange={(e) =>
                          setItems((prev) =>
                            prev.map((i) => (i.id === item.id ? { ...i, featured: e.target.checked } : i))
                          )
                        }
                        className="w-4 h-4 text-accent-cyan bg-bg-base border-white/10 rounded cursor-pointer"
                      />
                      <span>Featured on Homepage</span>
                    </label>
                  </div>
                ) : (
                  <div className="text-[10px] text-gray-500 font-mono truncate max-w-lg">
                    Image: {item.image}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 self-end lg:self-center">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="p-2 rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan hover:text-bg-base transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-2 rounded bg-white/5 border border-white/10 hover:text-white transition-colors cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingId(item.id)} className="p-2 rounded bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan transition-colors cursor-pointer">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-white transition-colors cursor-pointer">
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
