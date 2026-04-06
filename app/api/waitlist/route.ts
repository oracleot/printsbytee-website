import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  productId: z.string().min(1, "Product ID is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, productId } = result.data;
    const id = `wl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const createdAt = new Date().toISOString();

    // Save to waitlist.json
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "waitlist.json");
    
    let waitlist: unknown[] = [];
    try {
      const existingData = await fs.readFile(filePath, "utf-8");
      waitlist = JSON.parse(existingData);
    } catch {
      // File doesn't exist or is invalid JSON, start fresh
      waitlist = [];
    }

    // Check for duplicate (same email + productId)
    const isDuplicate = waitlist.some(
      (entry: unknown) => 
        typeof entry === "object" && 
        entry !== null && 
        "email" in entry && 
        "productId" in entry && 
        (entry as { email: string; productId: string }).email === email && 
        (entry as { email: string; productId: string }).productId === productId
    );

    if (isDuplicate) {
      return NextResponse.json(
        { success: true, message: "You're already on the list!" },
        { status: 200 }
      );
    }

    const newEntry = { id, email, productId, createdAt };
    waitlist.push(newEntry);

    await fs.writeFile(filePath, JSON.stringify(waitlist, null, 2));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}