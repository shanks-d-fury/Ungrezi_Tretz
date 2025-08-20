import mongoose, { Document, Schema } from "mongoose";

export interface ITreatment extends Document {
	_id: mongoose.Types.ObjectId;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

const TreatmentSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Treatment name is required"],
			trim: true,
			unique: true,
			maxlength: [100, "Treatment name cannot exceed 100 characters"],
		},
	},
	{
		timestamps: true,
	}
);

// Create index for better performance
TreatmentSchema.index({ name: 1 });

export default mongoose.models.Treatment ||
	mongoose.model<ITreatment>("Treatment", TreatmentSchema);
