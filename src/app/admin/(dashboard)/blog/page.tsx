import { db } from "@/lib/db";
import BlogManager from "@/components/BlogManager";

export const metadata = {
  title: "Blog Posts — Prime App Admin",
};

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { date: "desc" },
  });

  return <BlogManager initialPosts={posts} />;
}
