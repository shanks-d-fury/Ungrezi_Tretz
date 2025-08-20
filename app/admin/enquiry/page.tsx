"use client";
import { useState, useEffect } from "react";
import EnquiryCard from "@/components/enquiryCard";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

interface EnquiryData {
	id: string;
	user_name: string;
	user_email: string;
	message: string;
	created_at: string;
	status: string;
	package: {
		id: string;
		package_name: string;
		clinic_name: string;
		price: number;
		treatment: {
			id: string;
			name: string;
		};
	} | null;
}

export default function AdminEnquiryPage() {
	const [enquiries, setEnquiries] = useState<EnquiryData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEnquiries = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/admin/enquiries");

				if (!response.ok) {
					throw new Error("Failed to fetch enquiries");
				}

				const data = await response.json();
				setEnquiries(data.enquiries || []);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
				console.error("Error fetching enquiries:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchEnquiries();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-[#ffdff2] flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-lg text-center">
					<div className="flex flex-col items-center">
						<DotWave size="47" speed="1" color="#8A128F" />
						<p className="text-[#8a128f] mt-2">
							Please wait while we fetch the data.
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-[#ffdff2] flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
					<div className="text-red-500 text-5xl mb-4">⚠️</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						Error Loading Enquiries
					</h2>
					<p className="text-gray-600 mb-6">{error}</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<main className="min-h-screen bg-[#ffdff2] pt-20">
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-[#8a128f] mb-2">
							Customer Enquiries
						</h1>
						<p className="text-[#8a128f]">
							Total Enquiries: {enquiries.length}
						</p>
					</div>

					{enquiries.length === 0 ? (
						<div className="bg-white rounded-lg shadow-lg p-12 text-center">
							<div className="text-gray-400 text-6xl mb-4">📭</div>
							<h3 className="text-xl font-semibold text-[#8a128f] mb-2">
								No Enquiries Found
							</h3>
							<p className="text-[#8a128f]">
								Customer enquiries will appear here when they are submitted.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{enquiries.map((enquiry) => (
								<EnquiryCard key={enquiry.id} enquiry={enquiry} />
							))}
						</div>
					)}
				</div>
			</main>
		</>
	);
}
