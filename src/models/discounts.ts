import { Schema, Document, model, Types } from 'mongoose';

export interface IDiscount extends Document {
  product: Types.ObjectId;
  discount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const discountSchema: Schema<IDiscount> = new Schema<IDiscount>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    discount: { type: Number, min: 0, max: 100, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Discount = model<IDiscount>('Discounts', discountSchema);

export default Discount;
