import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    // Extract userWalletAddress from the query string
    const url = new URL(req.url);
    const userWalletAddress = url.searchParams.get("userWalletAddress");

    // Validate input
    if (!userWalletAddress) {
      return NextResponse.json({ error: "userWalletAddress is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Fetch user data based on userWalletAddress
    const user = await db.collection("users").findOne({ userWalletAddress });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user data
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error during fetch:", error);  // Log the error for debugging
    return NextResponse.json(
      { error: `An error occurred while fetching data: ${error.message}` },
      { status: 500 }
    );
  }
}
