import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { sendEnquiryEmail } from "@/lib/mail";

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  productInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = enquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, productInterest, message } = result.data;
    const id = `enq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const createdAt = new Date().toISOString();

    // Save to enquiries.json
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "enquiries.json");
    
    let enquiries: unknown[] = [];
    try {
      const existingData = await fs.readFile(filePath, "utf-8");
      enquiries = JSON.parse(existingData);
    } catch {
      // File doesn't exist or is invalid JSON, start fresh
      enquiries = [];
    }

    const newEnquiry = { id, name, email, productInterest, message, createdAt };
    enquiries.push(newEnquiry);

    await fs.writeFile(filePath, JSON.stringify(enquiries, null, 2));

    // Send email notification
    try {
      await sendEnquiryEmail({ name, email, productInterest, message });
    } catch (emailError) {
      console.error("Failed to send enquiry email:", emailError);
      // Don't fail the request if email fails - data is still saved
    }

    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}