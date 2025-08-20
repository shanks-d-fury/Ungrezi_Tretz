import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Enquiry } from "@/models";

export async function GET() {
	try {
		await connectDB();

		// Find all enquiries and populate package details with treatment info
		const enquiries = await Enquiry.find()
			.populate({
				path: "package_id",
				populate: {
					path: "treatment_id",
					select: "name",
				},
			})
			.sort({ createdAt: -1 }); // Sort by newest first

		// Format the response
		const formattedEnquiries = enquiries.map((enquiry) => ({
			id: enquiry._id.toString(),
			user_name: enquiry.user_name,
			user_email: enquiry.user_email,
			message: enquiry.message,
			created_at: enquiry.createdAt,
			status: enquiry.status || "pending",
			package: enquiry.package_id
				? {
						id: enquiry.package_id._id.toString(),
						package_name: enquiry.package_id.package_name,
						clinic_name: enquiry.package_id.clinic_name,
						price: enquiry.package_id.price,
						treatment: {
							id: enquiry.package_id.treatment_id._id.toString(),
							name: enquiry.package_id.treatment_id.name,
						},
				  }
				: null,
		}));

		return NextResponse.json({
			success: true,
			count: formattedEnquiries.length,
			enquiries: formattedEnquiries,
		});
	} catch (error) {
		console.error("Error fetching enquiries:", error);
		return NextResponse.json(
			{ error: "Failed to fetch enquiries" },
			{ status: 500 }
		);
	}
}
