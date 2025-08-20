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
			<button className="mt-4 w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors">
				Enquiry
			</button>
		</div>
	);
}
