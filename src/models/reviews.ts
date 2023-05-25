import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  product: Types.ObjectId;
  review: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema: Schema<IReview> = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    review: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Review = model<IReview>('Reviews', reviewSchema);

export default Review;
