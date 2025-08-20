"use client";
import Image from "next/image";
import { useState } from "react";
import Card, { PackageData } from "@/components/Card";

interface SearchResponse {
	searchTerm: string;
	packages: PackageData[];
	totalPackages: number;
	concernsFound: Array<{
		id: string;
		name: string;
		treatment: {
			id: string;
			name: string;
		};
	}>;
}

export default function Home() {
	const [searchInput, setSearchInput] = useState("");
	const [packages, setPackages] = useState<PackageData[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = async () => {
		if (searchInput.trim()) {
			setLoading(true);
			try {
				const response = await fetch(
					`/api/search?concern=${encodeURIComponent(searchInput.trim())}`
				);
				const data: SearchResponse = await response.json();

				if (response.ok) {
					setPackages(data.packages);
					setSearchTerm(data.searchTerm);
				} else {
					console.error("Search failed:", data);
					setPackages([]);
				}
			} catch (error) {
				console.error("Error fetching search results:", error);
				setPackages([]);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};
	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50">
				<div className="h-15 bg-white w-full rounded-b-lg rounded-bl-lg flex justify-between items-center">
					<Image
						src="/cosma-logo.svg"
						alt="Cosma Logo"
						width={120}
						height={40}
						className="relative left-4"
						priority
					/>
				</div>
			</header>
			<main className="min-h-screen bg-[#ffdff2] pt-4">
				<div className="flex items-center justify-center py-10">
					<div className="w-[980px] text-center p-10">
						<h2 className="m-0 text-[#d754c6] text-2xl font-semibold">
							Ask & Share{" "}
							<span className="text-[#ff68c3]">concerns and douts</span>
						</h2>
						<h1 className="mt-2 mb-1 text-[#8a128f] text-5xl font-extrabold">
							Cosma Community
						</h1>
						<p className="text-gray-600 mt-1 mb-9">
							A judgment-free space to ask beauty questions, share real
							experiences, & get opinions from people like you.
						</p>

						<div className="flex justify-center">
							<div className="flex items-center w-3/4 bg-white rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.08)] overflow-hidden">
								<div className="flex items-center px-5 py-4  justify-between border-r border-[#f0e6ef]">
									<select
										aria-label="Body part"
										defaultValue="Body part"
										className=" bg-transparent outline-none border-none text-pink-500 font-semibold text-sm cursor-pointer"
									>
										<option>Body</option>
										<option>Face</option>
										<option>Hair</option>
									</select>
								</div>

								<input
									type="text"
									placeholder="Type Concern or Procedure..."
									aria-label="Search concerns"
									className="flex-1 px-5 py-4 text-base outline-none border-none text-black"
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
									onKeyPress={handleKeyPress}
								/>

								<button
									type="button"
									aria-label="Search"
									className="bg-pink-400 text-white px-4 py-3 my-3 mr-4 rounded-lg cursor-pointer flex items-center justify-center hover:bg-pink-500 transition-colors disabled:opacity-50"
									onClick={handleSearch}
									disabled={loading}
								>
									{loading ? (
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="text-white"
										>
											<circle cx="11" cy="11" r="7"></circle>
											<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
										</svg>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Search Results Section */}
				{(searchTerm || loading) && (
					<div className="py-8">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							{loading ? (
								<div className="text-center">
									<div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-pink-500 bg-white">
										<div className="animate-spin -ml-1 mr-3 h-5 w-5 text-pink-500">
											<svg className="h-5 w-5" viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
													fill="none"
												/>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												/>
											</svg>
										</div>
										Searching for treatments...
									</div>
								</div>
							) : (
								<>
									<div className="text-center mb-8">
										<h2 className="text-2xl font-bold text-gray-900">
											Search Results for "{searchTerm}"
										</h2>
										<p className="text-gray-600 mt-2">
											Found {packages.length} treatment package
											{packages.length !== 1 ? "s" : ""}
										</p>
									</div>

									{packages.length > 0 ? (
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
											{packages.map((pkg) => (
												<Card key={pkg.id} pkg={pkg} />
											))}
										</div>
									) : (
										<div className="text-center py-8">
											<p className="text-gray-500 text-lg">
												No treatment packages found for your search.
											</p>
											<p className="text-gray-400 mt-2">
												Try searching with different keywords.
											</p>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				)}
			</main>
		</>
	);
}
