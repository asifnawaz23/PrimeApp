import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      company,
      email,
      phone,
      country,
      service,
      budget,
      projectTitle,
      description,
      contactMethod,
      honeypot,
    } = body;

    // Simple Honeypot Check
    if (honeypot) {
      console.warn("Spam detected: honeypot field filled");
      return NextResponse.json({ success: true, message: "Spam filtered" });
    }

    // Server-side Validation
    if (!name || !email || !phone || !description || !service || !budget) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Save to Database
    const inquiry = await db.inquiry.create({
      data: {
        name,
        company: company || "",
        email,
        phone,
        country: country || "",
        service,
        budget,
        description: projectTitle ? `[${projectTitle}] ${description}` : description,
        status: "New",
        assignedTo: "",
      },
    });

    console.log(`Saved inquiry in database with ID: ${inquiry.id}`);

    // 2. Write to Google Sheets (Optional / Fallback check)
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (clientEmail && privateKey && sheetId) {
      try {
        const auth = new google.auth.JWT({
          email: clientEmail,
          key: privateKey.replace(/\\n/g, "\n"),
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: "Sheet1!A:K",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC",
                name,
                email,
                phone,
                company || "",
                country || "",
                service,
                budget,
                projectTitle ? `[${projectTitle}] ${description}` : description,
                "New",
                "",
              ],
            ],
          },
        });

        console.log("Successfully appended inquiry row to Google Sheets");
      } catch (sheetError) {
        console.error("Google Sheets Sync Failed:", sheetError);
        // Do not fail the request if database save succeeded but sheets failed
      }
    } else {
      console.info("Google Sheets config not found. Skipping spreadsheet sync.");
    }

    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
