import React from "react";
import { db } from "@/lib/db";
import ServicesManager from "@/components/ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  let services: any[] = [];
  try {
    services = await db.service.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Failed to query services inside admin:", error);
  }

  return <ServicesManager initialServices={services} />;
}
