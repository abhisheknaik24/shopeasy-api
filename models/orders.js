import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    products: [{ type: Schema.Types.Mixed, required: true }],
    grandTotal: { type: Schema.Types.Decimal128, required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
    paymentOption: { type: String },
    isPayment: { type: Boolean, default: false },
    isReturn: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model('Orders', orderSchema);
