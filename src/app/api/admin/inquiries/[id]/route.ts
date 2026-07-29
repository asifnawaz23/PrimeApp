import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminSession } from "@/lib/auth";

interface PatchProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: PatchProps) {
  // 1. Authenticate Admin Session
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status, assignedTo } = body;

    // Validate Status field
    const validStatuses = ["New", "Contacted", "In Discussion", "Closed", "Spam"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status value" }, { status: 400 });
    }

    // 2. Perform DB update
    const updatedInquiry = await db.inquiry.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(assignedTo !== undefined && { assignedTo }),
      },
    });

    return NextResponse.json({ success: true, data: updatedInquiry });
  } catch (error) {
    console.error("Failed to update inquiry:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
export async function DELETE(request: Request, { params }: PatchProps) {
  // 1. Authenticate Admin Session
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.inquiry.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
