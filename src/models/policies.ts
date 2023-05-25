import { Schema, model, Document, Types } from 'mongoose';

export interface IPolicy extends Document {
  product: Types.ObjectId;
  policy: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const policySchema: Schema<IPolicy> = new Schema<IPolicy>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    policy: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Policy = model<IPolicy>('Policies', policySchema);

export default Policy;
