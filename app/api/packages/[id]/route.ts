import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Package } from "@/models";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		await connectDB();

		const packageId = params.id;

		if (!packageId) {
			return NextResponse.json(
				{ error: "Package ID is required" },
				{ status: 400 }
			);
		}

		// Find the package by ID and populate treatment details
		const packageData = await Package.findById(packageId).populate(
			"treatment_id"
		);

		if (!packageData) {
			return NextResponse.json({ error: "Package not found" }, { status: 404 });
		}

		// Format the response
		const response = {
			id: packageData._id,
			clinic_name: packageData.clinic_name,
			package_name: packageData.package_name,
			price: packageData.price,
			treatment: {
				id: packageData.treatment_id._id,
				name: packageData.treatment_id.name,
			},
			createdAt: packageData.createdAt,
			updatedAt: packageData.updatedAt,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Package fetch error:", error);

		return NextResponse.json(
			{
				error: "Internal server error",
				message: "Failed to fetch package details",
			},
			{ status: 500 }
		);
	}
}
