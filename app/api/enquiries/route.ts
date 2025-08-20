import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Enquiry } from "@/models";

export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const body = await request.json();
		const { package_id, user_name, user_email, message } = body;

		// Validate required fields
		if (!package_id || !user_name || !user_email || !message) {
			return NextResponse.json(
				{
					error:
						"All fields are required: package_id, user_name, user_email, message",
				},
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(user_email)) {
			return NextResponse.json(
				{ error: "Please provide a valid email address" },
				{ status: 400 }
			);
		}

		// Create new enquiry
		const enquiry = await Enquiry.create({
			package_id,
			user_name: user_name.trim(),
			user_email: user_email.trim().toLowerCase(),
			message: message.trim(),
			created_at: new Date(),
		});

		return NextResponse.json(
			{
				message: "Enquiry submitted successfully",
				enquiry: {
					id: enquiry._id,
					package_id: enquiry.package_id,
					user_name: enquiry.user_name,
					user_email: enquiry.user_email,
					message: enquiry.message,
					created_at: enquiry.created_at,
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Enquiry submission error:", error);

		if (error instanceof Error && error.message.includes("validation")) {
			return NextResponse.json(
				{ error: "Validation error", details: error.message },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ error: "Internal server error", message: "Failed to submit enquiry" },
			{ status: 500 }
		);
	}
}
