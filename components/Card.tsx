"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid } from "ldrs/react";
import "ldrs/react/Grid.css";

// Card component for displaying package information
export interface PackageData {
	id: string;
	clinic_name: string;
	package_name: string;
	price: number;
	treatment: {
		id: string;
		name: string;
	};
}

interface CardProps {
	pkg: PackageData;
}

export default function Card({ pkg }: CardProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleEnquiry = () => {
		setIsLoading(true);
		router.push(`/enquiry/${pkg.id}`);
		// Note: Loading will be cleared when component unmounts during navigation
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
			<h3 className="text-lg font-semibold text-gray-800 mb-2">
				{pkg.package_name}
			</h3>
			<p className="text-pink-600 font-medium mb-2">{pkg.clinic_name}</p>
			<p className="text-gray-600 mb-3">Treatment: {pkg.treatment.name}</p>
			<p className="text-1xl font-bold text-green-600">
				₹{pkg.price.toLocaleString()}
			</p>
			<button
				type="button"
				className="mt-4 w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
				onClick={handleEnquiry}
				disabled={isLoading}
			>
				{isLoading ? <Grid size="25" speed="1.3" color="white" /> : "Enquiry"}
			</button>
		</div>
	);
}
