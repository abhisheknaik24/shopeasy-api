import { Schema, Document, model, Types } from 'mongoose';

export interface IOffer extends Document {
  product: Types.ObjectId;
  offer: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema: Schema<IOffer> = new Schema<IOffer>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    offer: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Offer = model<IOffer>('Offers', offerSchema);

export default Offer;
