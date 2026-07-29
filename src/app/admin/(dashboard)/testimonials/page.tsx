import { db } from "@/lib/db";
import TestimonialsManager from "@/components/TestimonialsManager";

export const metadata = {
  title: "Testimonials — Prime App Admin",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany();

  return <TestimonialsManager initialTestimonials={testimonials} />;
}
