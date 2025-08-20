import connectDB from "../lib/mongodb";
import { Treatment, Concern, Package, Enquiry } from "../models";
import treatmentsData from "./treatments.json";
import concernsData from "./concerns.json";
import packagesData from "./packages.json";

async function seedDatabase() {
	try {
		await connectDB();

		// Clear existing data
		await Treatment.deleteMany({});
		await Concern.deleteMany({});
		await Package.deleteMany({});
		await Enquiry.deleteMany({});

		console.log("🗑️  Cleared existing data");

		// 1. Seed Treatments first
		const treatments = await Treatment.insertMany(treatmentsData);
		console.log("✅ Seeded treatments:", treatments.length);

		// Create a map of treatment names to IDs
		const treatmentMap: { [key: string]: any } = {};
		treatments.forEach((treatment) => {
			treatmentMap[treatment.name] = treatment._id;
		});

		// 2. Seed Concerns with treatment_id references
		const concernsWithTreatmentIds = concernsData.map((concern) => ({
			name: concern.name,
			treatment_id: treatmentMap[concern.treatment_name],
		}));

		const concerns = await Concern.insertMany(concernsWithTreatmentIds);
		console.log("✅ Seeded concerns:", concerns.length);

		// 3. Seed Packages with treatment_id references
		const packagesWithTreatmentIds = packagesData.map((pkg) => ({
			clinic_name: pkg.clinic_name,
			package_name: pkg.package_name,
			treatment_id: treatmentMap[pkg.treatment_name],
			price: pkg.price,
		}));

		const packages = await Package.insertMany(packagesWithTreatmentIds);
		console.log("✅ Seeded packages:", packages.length);

		// Create a map of package names to IDs
		const packageMap: Record<string, any> = {};
		packages.forEach((pkg) => {
			const key = `${pkg.package_name}-${pkg.clinic_name}`;
			packageMap[key] = pkg._id;
		});

		console.log("🎉 Database seeded successfully!");

		// Display summary
		console.log("\n📊 Database Summary:");
		console.log(`Treatments: ${treatments.length}`);
		console.log(`Concerns: ${concerns.length}`);
		console.log(`Packages: ${packages.length}`);
	} catch (error) {
		console.error("❌ Error seeding database:", error);
	}
}

// Export for use in other files or run directly
export default seedDatabase;

// Run if called directly
if (require.main === module) {
	seedDatabase().then(() => {
		process.exit(0);
	});
}
