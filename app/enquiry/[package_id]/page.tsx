"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LineSpinner, Reuleaux } from "ldrs/react";
import "ldrs/react/LineSpinner.css";
import "ldrs/react/Reuleaux.css";

interface PackageDetails {
	id: string;
	clinic_name: string;
	package_name: string;
	price: number;
	treatment: {
		id: string;
		name: string;
	};
}

export default function EnquiryPage() {
	const params = useParams();
	const router = useRouter();
	const packageId = params.package_id as string;

	const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(
		null
	);
	const [packageLoading, setPackageLoading] = useState(true);
	const [formData, setFormData] = useState({
		user_name: "",
		user_email: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	// Fetch package details when component mounts
	useEffect(() => {
		const fetchPackageDetails = async () => {
			setPackageLoading(true);
			try {
				const response = await fetch(`/api/packages/${packageId}`);
				if (response.ok) {
					const data = await response.json();
					setPackageDetails(data);
				}
			} catch (error) {
				console.error("Error fetching package details:", error);
			} finally {
				setPackageLoading(false);
			}
		};

		if (packageId) {
			fetchPackageDetails();
		}
	}, [packageId]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.user_name || !formData.user_email || !formData.message) {
			alert("Please fill in all fields");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch("/api/enquiries", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					package_id: packageId,
					...formData,
				}),
			});

			if (response.ok) {
				setSubmitSuccess(true);
				setFormData({ user_name: "", user_email: "", message: "" });
			} else {
				const errorData = await response.json();
				alert(`Submission failed: ${errorData.message || "Unknown error"}`);
			}
		} catch (error) {
			console.error("Error submitting enquiry:", error);
			alert("Error submitting enquiry. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (submitSuccess) {
		return (
			<div className="min-h-screen bg-[#ffdff2] flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
					<div className="text-green-500 text-5xl mb-4">✓</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						Enquiry Submitted Successfully!
					</h2>
					<p className="text-gray-600 mb-6">
						Thank you for your interest. We will get back to you soon.
					</p>
					<button
						onClick={() => router.push("/")}
						className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors"
					>
						Back to Home
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<main className="min-h-screen bg-[#ffdff2] pt-20">
				<div className="max-w-2xl mx-auto px-4 py-8">
					<div className="bg-white rounded-lg shadow-lg p-8">
						<h1 className="text-3xl font-bold text-[#8A128F] mb-6 text-center">
							Make an Enquiry
						</h1>

						{packageLoading ? (
							<div className="flex justify-center">
								<LineSpinner size="40" stroke="3" speed="1" color="#F6339A" />
							</div>
						) : (
							packageDetails && (
								<div className="bg-pink-50 p-4 rounded-lg mb-6">
									<h3 className="text-lg font-semibold text-[#8a128f] mb-2">
										{packageDetails.package_name}
									</h3>
									<p className="text-[#d754c6] mb-1">
										<strong>Clinic:</strong> {packageDetails.clinic_name}
									</p>
									<p className="text-[#d754c6] mb-1">
										<strong>Treatment:</strong> {packageDetails.treatment.name}
									</p>
									<p className="text-[#d754c6]">
										<strong>Price:</strong> ₹
										{packageDetails.price.toLocaleString()}
									</p>
								</div>
							)
						)}

						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="user_name"
									className="block text-sm font-medium text-[#8A128F] mb-2"
								>
									Full Name *
								</label>
								<input
									type="text"
									id="user_name"
									name="user_name"
									value={formData.user_name}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-[#8A128F]"
									placeholder="Enter your full name"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="user_email"
									className="block text-sm font-medium text-[#8A128F] mb-2"
								>
									Email Address *
								</label>
								<input
									type="email"
									id="user_email"
									name="user_email"
									value={formData.user_email}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-[#8A128F]"
									placeholder="Enter your email address"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-[#8A128F] mb-2"
								>
									Message *
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleInputChange}
									rows={5}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-black"
									placeholder="Tell us about your concerns, questions, or specific requirements..."
									required
								/>
							</div>

							<div className="flex space-x-4">
								<button
									type="button"
									onClick={() => router.back()}
									className="flex-1 px-4 py-2 border border-gray-300 text-[#8A128F] rounded-md hover:bg-gray-50 transition-colors"
								>
									Back
								</button>
								<button
									type="submit"
									disabled={loading}
									className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors disabled:opacity-50"
								>
									{loading ? (
										<Reuleaux
											size="20"
											stroke="4"
											strokeLength="0.2"
											bgOpacity="0.2"
											speed="1.2"
											color="white"
										/>
									) : (
										"Submit Enquiry"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
