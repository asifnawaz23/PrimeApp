import { db } from "@/lib/db";
import FaqManager from "@/components/FaqManager";

export const metadata = {
  title: "FAQs — Prime App Admin",
};

export default async function AdminFaqPage() {
  const faqs = await db.faq.findMany({
    orderBy: { order: "asc" },
  });

  return <FaqManager initialFaqs={faqs} />;
}
