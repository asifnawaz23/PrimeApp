import React from "react";
import { db } from "@/lib/db";
import PortfolioManager from "@/components/PortfolioManager";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  let items: any[] = [];
  try {
    items = await db.portfolio.findMany();
  } catch (error) {
    console.error("Failed to query portfolio inside admin dashboard:", error);
  }

  return <PortfolioManager initialItems={items} />;
}
