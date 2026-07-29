"use client";

import React, { useState } from "react";
import { Search, Trash2, Calendar, User, Save, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface Inquiry {
  id: string;
  date: Date;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  country: string | null;
  service: string;
  budget: string;
  description: string;
  status: string;
  assignedTo: string | null;
}

interface InquiriesDashboardProps {
  initialInquiries: Inquiry[];
}

export default function InquiriesDashboard({ initialInquiries }: InquiriesDashboardProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [assigneeInputs, setAssigneeInputs] = useState<Record<string, string>>(
    initialInquiries.reduce((acc, inq) => {
      acc[inq.id] = inq.assignedTo || "";
      return acc;
    }, {} as Record<string, string>)
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const statuses = ["All", "New", "Contacted", "In Discussion", "Closed", "Spam"];

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === "All" || inq.status === filterStatus;
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inq.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAssigneeSave = async (id: string) => {
    setUpdatingId(id);
    const newAssignee = assigneeInputs[id];
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedTo: newAssignee }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, assignedTo: newAssignee } : inq))
        );
        alert("Assignee updated successfully!");
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to update assignee:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const res = await fetch(`/api/admin/inquiries/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setInquiries((prev) => prev.filter((inq) => inq.id !== id));
          router.refresh();
        }
      } catch (err) {
        console.error("Failed to delete inquiry:", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl text-white">Submitted Inquiries</h1>
        <div className="text-gray-400 text-xs font-mono">
          Total Inquiries: <span className="text-accent-cyan font-bold">{inquiries.length}</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 glass-input text-xs"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterStatus === status
                  ? "bg-accent-cyan text-bg-base font-bold shadow-md shadow-accent-cyan/15"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-gray-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="p-4">Date</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Details</th>
                <th className="p-4">Description</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assignee</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 italic">
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/2 transition-colors">
                    {/* Date */}
                    <td className="p-4 text-gray-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                        <span>{new Date(inq.date).toLocaleDateString("en-US", { dateStyle: "short" })}</span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="p-4">
                      <div className="font-semibold text-white">{inq.name}</div>
                      <div className="text-gray-400 text-xs">{inq.email}</div>
                      <div className="text-gray-500 text-[10px] font-mono mt-0.5">{inq.phone}</div>
                    </td>

                    {/* Details */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-accent-cyan">{inq.service}</div>
                      <div className="text-gray-400 text-xs">{inq.budget}</div>
                      {inq.company && <div className="text-gray-500 text-[10px] mt-0.5">@ {inq.company}</div>}
                    </td>

                    {/* Description */}
                    <td className="p-4 max-w-xs">
                      <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">
                        {inq.description}
                      </p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        disabled={updatingId === inq.id}
                        className="py-1 px-2.5 glass-input text-xs font-semibold rounded cursor-pointer text-accent-cyan bg-bg-ink border-white/10"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Closed">Closed</option>
                        <option value="Spam">Spam</option>
                      </select>
                    </td>

                    {/* Assigned To Inline Edit */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={assigneeInputs[inq.id] || ""}
                          onChange={(e) =>
                            setAssigneeInputs((prev) => ({ ...prev, [inq.id]: e.target.value }))
                          }
                          placeholder="Assignee"
                          className="w-24 py-1 px-2 glass-input text-xs"
                        />
                        <button
                          onClick={() => handleAssigneeSave(inq.id)}
                          disabled={updatingId === inq.id}
                          className="p-1 rounded bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan transition-colors cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-white transition-all cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
