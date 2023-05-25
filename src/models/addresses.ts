import { Schema, model, Document, Types } from 'mongoose';

export interface IAddress extends Document {
  user: Types.ObjectId;
  address: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddress>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    address: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Address = model<IAddress>('Addresses', addressSchema);

export default Address;
