import Image from "next/image";

export default function Home() {
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
			<main className="min-h-screen flex items-center justify-center bg-[#ffdff2] pt-4">
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
									<option>Body part</option>
									<option>Face</option>
									<option>Hair</option>
									<option>Body</option>
								</select>
							</div>

							<input
								type="text"
								placeholder="Type Concern or Procedure..."
								aria-label="Search concerns"
								className="flex-1 px-5 py-4 text-base outline-none border-none text-black"
							/>

							<button
								aria-label="Search"
								className="bg-pink-400 text-white px-4 py-3 my-3 mr-4 rounded-lg cursor-pointer flex items-center justify-center"
							>
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
							</button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
