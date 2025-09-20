import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = user.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      return NextResponse.json(
        { error: "No email found for user" },
        { status: 400 }
      );
    }

    // Check if User already exists
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    // If user doesn't exist, create a new one
    if (!users.length) {
      if (!user.fullName) {
        return NextResponse.json(
          { error: "User name is required" },
          { status: 400 }
        );
      }

      const result = await db
        .insert(usersTable)
        .values({
          name: user.fullName,
          email: userEmail,
          credits: 10,
        })
        .returning();

      return NextResponse.json(result[0]?.userTable);
    }

    return NextResponse.json(users[0]);
  } catch (e) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}
