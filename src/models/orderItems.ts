import { Schema, Document, model, Types } from 'mongoose';

export interface IOrderItem extends Document {
  product: Types.ObjectId;
  quantity: number;
  isReturn: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema: Schema<IOrderItem> = new Schema<IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, min: 1, required: true },
    isReturn: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const OrderItem = model<IOrderItem>('OrderItems', orderItemSchema);

export default OrderItem;
