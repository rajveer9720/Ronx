import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // Extract userWalletAddress and username from the request body
    const { userWalletAddress, username } = await req.json();

    // Validate input
    if (!userWalletAddress || !username) {
      return NextResponse.json(
        { error: "userWalletAddress and username are required" },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters long" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Check if the user exists based on userWalletAddress
    const user = await db.collection("users").findOne({ userWalletAddress });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user's username in the database
    const result = await db.collection("users").updateOne(
      { userWalletAddress }, // Identifying user by wallet address
      { $set: { username } }  // Only updating the username
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No changes made. Username might already be the same." },
        { status: 400 }
      );
    }

    // Return success message
    return NextResponse.json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Error during update:", error.message); // Log only the message part of the error for clarity
    return NextResponse.json(
      { error: `An error occurred while updating the username: ${error.message}` },
      { status: 500 }
    );
  }
}
