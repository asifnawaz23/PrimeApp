"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Layers } from "lucide-react";
import { createService, updateService, deleteService } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  order: number;
}

interface ServicesManagerProps {
  initialServices: Service[];
}

export default function ServicesManager({ initialServices }: ServicesManagerProps) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [form, setForm] = useState({
    title: "",
    icon: "Code",
    description: "",
    order: 0,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createService(form);
      setServices((prev) => [...prev, res].sort((a, b) => a.order - b.order));
      setIsCreating(false);
      setForm({ title: "", icon: "Code", description: "", order: 0 });
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create service.");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const item = services.find((s) => s.id === id);
      if (!item) return;
      await updateService(id, {
        title: item.title,
        icon: item.icon,
        description: item.description,
        order: Number(item.order),
      });
      setEditingId(null);
      setServices((prev) => [...prev].sort((a, b) => a.order - b.order));
      router.refresh();
      alert("Service updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update service.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        setServices((prev) => prev.filter((s) => s.id !== id));
        router.refresh();
      } catch (err) {
        console.error(err);
        alert("Failed to delete service.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl text-white">Manage Services</h1>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-gradient-to-r from-accent-violet to-accent-cyan text-bg-base font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-90"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isCreating ? "Cancel" : "Add Service"}
        </button>
      </div>

      {/* Creation Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="glass-card rounded-xl p-6 border border-white/5 space-y-4 max-w-xl">
          <h2 className="font-display font-bold text-white text-sm">New Service</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="e.g. iOS Development"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5">Icon Name (Lucide)</label>
              <input
                type="text"
                required
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full py-2 px-3 glass-input text-xs"
                placeholder="Smartphone, Globe, Cpu..."
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Order Number</label>
            <input
              type="number"
              required
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full py-2 px-3 glass-input text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full py-2 px-3 glass-input text-xs"
              placeholder="Outlines service capabilities..."
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-accent-cyan text-bg-base font-bold rounded text-xs cursor-pointer">
            Create Service
          </button>
        </form>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => {
          const isEditing = editingId === service.id;
          return (
            <div key={service.id} className="glass-card rounded-xl p-6 border border-white/5 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-grow space-y-3">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s) => (s.id === service.id ? { ...s, title: e.target.value } : s))
                        )
                      }
                      className="py-1 px-2.5 glass-input text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={service.icon}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s) => (s.id === service.id ? { ...s, icon: e.target.value } : s))
                        )
                      }
                      className="py-1 px-2.5 glass-input text-xs"
                    />
                    <input
                      type="number"
                      value={service.order}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s) => (s.id === service.id ? { ...s, order: Number(e.target.value) } : s))
                        )
                      }
                      className="py-1 px-2.5 glass-input text-xs"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan text-xs font-mono">
                      Order: {service.order}
                    </span>
                    <h3 className="font-display font-bold text-white text-base">{service.title}</h3>
                    <span className="text-gray-500 text-xs font-mono">Icon: {service.icon}</span>
                  </div>
                )}

                {isEditing ? (
                  <textarea
                    rows={2}
                    value={service.description}
                    onChange={(e) =>
                      setServices((prev) =>
                        prev.map((s) => (s.id === service.id ? { ...s, description: e.target.value } : s))
                      )
                    }
                    className="w-full py-1 px-2.5 glass-input text-xs"
                  />
                ) : (
                  <p className="text-gray-400 text-xs max-w-2xl leading-relaxed">{service.description}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 self-end md:self-center">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleUpdate(service.id)}
                      className="p-2 rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan hover:text-bg-base transition-colors cursor-pointer"
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
                      onClick={() => setEditingId(service.id)}
                      className="p-2 rounded bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-white transition-colors cursor-pointer"
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
