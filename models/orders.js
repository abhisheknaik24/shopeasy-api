import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    product: { type: Schema.Types.ObjectId, ref: 'Products' },
    quantity: { type: Number, min: 1, required: true },
    grandTotal: { type: Schema.Types.Decimal128, required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
    isReturn: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model('Orders', orderSchema);
