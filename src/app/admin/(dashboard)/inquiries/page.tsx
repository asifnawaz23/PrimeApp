import React from "react";
import { db } from "@/lib/db";
import InquiriesDashboard from "@/components/InquiriesDashboard";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  let inquiries: any[] = [];
  try {
    inquiries = await db.inquiry.findMany({
      orderBy: { date: "desc" },
    });
  } catch (error) {
    console.error("Failed to query inquiries inside admin dashboard:", error);
  }

  // Format dates to avoid client-server hydration mismatch
  const formattedInquiries = inquiries.map((inq) => ({
    ...inq,
    date: inq.date.toISOString(),
  }));

  return <InquiriesDashboard initialInquiries={formattedInquiries} />;
}
