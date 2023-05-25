import { Schema, Document, model, Types } from 'mongoose';

export interface IFeature extends Document {
  product: Types.ObjectId;
  feature: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const featureSchema: Schema<IFeature> = new Schema<IFeature>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    feature: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Feature = model<IFeature>('Features', featureSchema);

export default Feature;
