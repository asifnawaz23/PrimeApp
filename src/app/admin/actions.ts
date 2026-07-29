"use server";

import { db } from "@/lib/db";
import { verifyAdminSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Helper to assert authentication in Server Actions
async function assertAuth() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    throw new Error("Unauthorized access. Admin session required.");
  }
}

// ==========================================
// 1. SERVICES CRUD ACTIONS
// ==========================================
export async function createService(data: { title: string; icon: string; description: string; order: number }) {
  await assertAuth();
  const service = await db.service.create({ data });
  revalidatePath("/");
  revalidatePath("/services");
  return service;
}

export async function updateService(id: string, data: { title?: string; icon?: string; description?: string; order?: number }) {
  await assertAuth();
  const service = await db.service.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/services");
  return service;
}

export async function deleteService(id: string) {
  await assertAuth();
  await db.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/services");
  return { success: true };
}

// ==========================================
// 2. PORTFOLIO CRUD ACTIONS
// ==========================================
export async function createPortfolio(data: { title: string; tags: string; tech: string; link?: string; image: string; featured?: boolean }) {
  await assertAuth();
  const item = await db.portfolio.create({
    data: {
      ...data,
      link: data.link || "",
      featured: data.featured || false,
    },
  });
  revalidatePath("/");
  revalidatePath("/portfolio");
  return item;
}

export async function updatePortfolio(id: string, data: { title?: string; tags?: string; tech?: string; link?: string; image?: string; featured?: boolean }) {
  await assertAuth();
  const item = await db.portfolio.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/portfolio");
  return item;
}

export async function deletePortfolio(id: string) {
  await assertAuth();
  await db.portfolio.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/portfolio");
  return { success: true };
}

// ==========================================
// 3. BLOG POSTS CRUD ACTIONS
// ==========================================
export async function createBlogPost(data: { title: string; slug: string; summary: string; content: string; published?: boolean }) {
  await assertAuth();
  const post = await db.blogPost.create({
    data: {
      ...data,
      published: data.published || false,
    },
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  return post;
}

export async function updateBlogPost(id: string, data: { title?: string; slug?: string; summary?: string; content?: string; published?: boolean }) {
  await assertAuth();
  const post = await db.blogPost.update({
    where: { id },
    data,
  });
  revalidatePath("/blog");
  if (data.slug) {
    revalidatePath(`/blog/${data.slug}`);
  }
  return post;
}

export async function deleteBlogPost(id: string) {
  await assertAuth();
  const post = await db.blogPost.findUnique({ where: { id } });
  await db.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  if (post) {
    revalidatePath(`/blog/${post.slug}`);
  }
  return { success: true };
}

// ==========================================
// 4. FAQS CRUD ACTIONS
// ==========================================
export async function createFAQ(data: { question: string; answer: string; order: number }) {
  await assertAuth();
  const faq = await db.faq.create({ data });
  revalidatePath("/");
  revalidatePath("/faq");
  return faq;
}

export async function updateFAQ(id: string, data: { question?: string; answer?: string; order?: number }) {
  await assertAuth();
  const faq = await db.faq.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/faq");
  return faq;
}

export async function deleteFAQ(id: string) {
  await assertAuth();
  await db.faq.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/faq");
  return { success: true };
}

// ==========================================
// 5. TESTIMONIALS CRUD ACTIONS
// ==========================================
export async function createTestimonial(data: { name: string; role: string; company: string; content: string; avatar: string }) {
  await assertAuth();
  const test = await db.testimonial.create({ data });
  revalidatePath("/");
  return test;
}

export async function updateTestimonial(id: string, data: { name?: string; role?: string; company?: string; content?: string; avatar?: string }) {
  await assertAuth();
  const test = await db.testimonial.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  return test;
}

export async function deleteTestimonial(id: string) {
  await assertAuth();
  await db.testimonial.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}
