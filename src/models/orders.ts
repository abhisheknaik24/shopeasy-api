import { Schema, Document, model, Types } from 'mongoose';

export interface IOrder extends Document {
  user: Types.ObjectId;
  orders: Types.ObjectId[];
  grandTotal: Types.Decimal128;
  orderDate: Date;
  deliveryDate?: Date;
  paymentOption?: string;
  isPayment: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema: Schema<IOrder> = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    orders: [
      { type: Schema.Types.ObjectId, ref: 'OrderItems', required: true },
    ],
    grandTotal: { type: Schema.Types.Decimal128, required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
    paymentOption: { type: String },
    isPayment: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Order = model<IOrder>('Orders', orderSchema);

export default Order;
