import mongoose, { Document, Schema } from "mongoose";

export interface IConcern extends Document {
	_id: mongoose.Types.ObjectId;
	name: string;
	treatment_id: mongoose.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const ConcernSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Concern name is required"],
			trim: true,
			maxlength: [100, "Concern name cannot exceed 100 characters"],
		},
		treatment_id: {
			type: Schema.Types.ObjectId,
			ref: "Treatment",
			required: [true, "Treatment ID is required"],
		},
	},
	{
		timestamps: true,
	}
);

// Create indexes for better performance
ConcernSchema.index({ name: 1 });
ConcernSchema.index({ treatment_id: 1 });

export default mongoose.models.Concern ||
	mongoose.model<IConcern>("Concern", ConcernSchema);
