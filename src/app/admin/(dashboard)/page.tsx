import { redirect } from "next/navigation";

// The (dashboard) route group root maps to /admin, which conflicts with
// src/app/admin/page.tsx. Both redirect to /admin/overview where the actual
// dashboard stats page lives.
export default function AdminDashboardIndexPage() {
  redirect("/admin/overview");
}
