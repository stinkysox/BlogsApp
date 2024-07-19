import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await ConnectDB(); // Connect to the database within the handler

    const formData = await request.formData();
    const emailData = {
      email: `${formData.get("email")}`,
    };

    await EmailModel.create(emailData);

    return NextResponse.json({ success: true, message: "Email Added" });
  } catch (error) {
    console.error("Error adding email:", error);
    return NextResponse.json(
      { success: false, message: "Error adding email" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Email Unsubscribed" });
}
