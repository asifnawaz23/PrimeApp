import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "fallback-secret-key-12345";

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return false;

    const decoded = jwt.verify(token, SECRET);
    return !!decoded;
  } catch {
    return false;
  }
}
