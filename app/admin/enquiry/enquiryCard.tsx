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

interface EnquiryCardProps {
	enquiry: EnquiryData;
}
export default function EnquiryCard({ enquiry }: EnquiryCardProps) {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-IN", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
			{/* Header with user info and status */}
			<div className="flex justify-between items-start mb-4">
				<div>
					<h3 className="text-2xl font-semibold text-[#8a128f]">
						{enquiry.user_name}
					</h3>
					<p className="text-[#8a128f] text-sm">{enquiry.user_email}</p>
				</div>
			</div>

			{/* Package details */}
			{enquiry.package && (
				<div className="bg-pink-50 p-4 rounded-lg mb-4">
					<h4 className="font-medium text-pink-800 mb-2">
						{enquiry.package.package_name}
					</h4>
					<div className="flex flex-col text-sm">
						<p className="text-pink-600">
							<strong>Clinic:</strong> {enquiry.package.clinic_name}
						</p>
						<p className="text-pink-600">
							<strong>Price:</strong> ₹{enquiry.package.price.toLocaleString()}
						</p>
						<p className="text-pink-600 col-span-2">
							<strong>Treatment:</strong> {enquiry.package.treatment.name}
						</p>
					</div>
				</div>
			)}

			{/* Message */}
			<div className="mb-4">
				<h5 className="font-medium text-[#8a128f] mb-2">Message:</h5>
				<p className="text-[#8a128f] leading-relaxed bg-gray-50 p-1 rounded">
					{enquiry.message}
				</p>
			</div>

			{/* Footer with date and actions */}
			<div className="flex justify-between items-center pt-1 border-t border-gray-100">
				<p className="text-xs text-[#8a128f]">
					Received: {formatDate(enquiry.created_at)}
				</p>
			</div>
		</div>
	);
}
