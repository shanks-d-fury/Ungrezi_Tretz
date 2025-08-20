import mongoose, { Document, Schema } from "mongoose";

export interface IEnquiry extends Document {
	_id: mongoose.Types.ObjectId;
	package_id: mongoose.Types.ObjectId;
	user_name: string;
	user_email: string;
	message: string;
	created_at: Date;
	updatedAt: Date;
}

const EnquirySchema: Schema = new Schema(
	{
		package_id: {
			type: Schema.Types.ObjectId,
			ref: "Package",
			required: [true, "Package ID is required"],
		},
		user_name: {
			type: String,
			required: [true, "User name is required"],
			trim: true,
			maxlength: [50, "User name cannot exceed 50 characters"],
		},
		user_email: {
			type: String,
			required: [true, "User email is required"],
			trim: true,
			lowercase: true,
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				"Please enter a valid email",
			],
		},
		message: {
			type: String,
			required: [true, "Message is required"],
			trim: true,
			maxlength: [500, "Message cannot exceed 500 characters"],
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

// Create indexes for better performance
EnquirySchema.index({ package_id: 1 });
EnquirySchema.index({ user_email: 1 });
EnquirySchema.index({ created_at: -1 });

export default mongoose.models.Enquiry ||
	mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
