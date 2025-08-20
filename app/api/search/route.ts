import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Concern, Package } from "@/models";

export async function GET(request: NextRequest) {
	try {
		// Connect to MongoDB
		await connectDB();

		// Get the concern from query parameters
		const { searchParams } = new URL(request.url);
		const concernQuery = searchParams.get("concern");

		if (!concernQuery) {
			return NextResponse.json(
				{ error: "Concern parameter is required" },
				{ status: 400 }
			);
		}

		// Search for concerns that match the query (case-insensitive partial match)
		const concerns = await Concern.find({
			name: { $regex: concernQuery, $options: "i" },
		}).populate("treatment_id");

		if (concerns.length === 0) {
			return NextResponse.json(
				{
					message: "No concerns found for your search",
					packages: [],
					searchTerm: concernQuery,
				},
				{ status: 200 }
			);
		}

		// Get all treatment IDs from the found concerns
		const treatmentIds = concerns.map((concern) => concern.treatment_id._id);

		// Find packages that use these treatments
		const packages = await Package.find({
			treatment_id: { $in: treatmentIds },
		}).populate("treatment_id");

		// Format the response
		const response = {
			searchTerm: concernQuery,
			concernsFound: concerns.map((concern) => ({
				id: concern._id,
				name: concern.name,
				treatment: {
					id: concern.treatment_id._id,
					name: concern.treatment_id.name,
				},
			})),
			packages: packages.map((pkg) => ({
				id: pkg._id,
				clinic_name: pkg.clinic_name,
				package_name: pkg.package_name,
				price: pkg.price,
				treatment: {
					id: pkg.treatment_id._id,
					name: pkg.treatment_id.name,
				},
				createdAt: pkg.createdAt,
				updatedAt: pkg.updatedAt,
			})),
			totalPackages: packages.length,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Search API Error:", error);
		return NextResponse.json(
			{
				error: "Internal server error",
				message: "Failed to search for packages",
			},
			{ status: 500 }
		);
	}
}
