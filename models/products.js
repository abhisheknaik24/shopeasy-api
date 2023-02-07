import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: { type: String, maxLength: 255, required: true },
    desc: { type: String, maxLength: 500, required: true },
    price: { type: Schema.Types.Decimal128, required: true },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    offers: [{ type: String, maxLength: 255 }],
    policies: [{ type: String, maxLength: 255 }],
    specs: { type: Map, required: true },
    features: [{ type: String, maxLength: 255 }],
    ratings: { type: Number, min: 0, default: 0 },
    reviews: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model('Products', productSchema);
