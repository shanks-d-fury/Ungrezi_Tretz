import mongoose, { Document, Schema } from "mongoose";

export interface IPackage extends Document {
	_id: mongoose.Types.ObjectId;
	clinic_name: string;
	package_name: string;
	treatment_id: mongoose.Types.ObjectId;
	price: number;
	createdAt: Date;
	updatedAt: Date;
}

const PackageSchema: Schema = new Schema(
	{
		clinic_name: {
			type: String,
			required: [true, "Clinic name is required"],
			trim: true,
			maxlength: [100, "Clinic name cannot exceed 100 characters"],
		},
		package_name: {
			type: String,
			required: [true, "Package name is required"],
			trim: true,
			maxlength: [100, "Package name cannot exceed 100 characters"],
		},
		treatment_id: {
			type: Schema.Types.ObjectId,
			ref: "Treatment",
			required: [true, "Treatment ID is required"],
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
			min: [0, "Price cannot be negative"],
		},
	},
	{
		timestamps: true,
	}
);

// Create indexes for better performance
PackageSchema.index({ clinic_name: 1 });
PackageSchema.index({ treatment_id: 1 });
PackageSchema.index({ price: 1 });

export default mongoose.models.Package ||
	mongoose.model<IPackage>("Package", PackageSchema);
