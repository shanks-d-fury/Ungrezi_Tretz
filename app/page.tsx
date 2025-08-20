"use client";

import { useState } from "react";
import Card, { PackageData } from "@/components/Card";
import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";
import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";
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
										// Default values shown
										<TailChase size="17" speed="1.75" color="white" />
									) : (
										<i className="fa-solid fa-magnifying-glass"></i>
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
								// Default values shown
								<Waveform size="35" stroke="3.5" speed="1" color="white" />
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
