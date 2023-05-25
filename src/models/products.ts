import { Schema, model, Document, Types } from 'mongoose';
import slugifyMongoose from 'slugify-mongoose';

export interface IProduct extends Document {
  slug: string;
  category: Types.ObjectId;
  image: string;
  name: string;
  description?: string;
  price: Types.Decimal128;
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    slug: { type: String, slug: 'name', unique: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
      required: true,
    },
    image: { type: String },
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 500 },
    price: { type: Schema.Types.Decimal128, required: true },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.plugin(slugifyMongoose);

const Product = model<IProduct>('Products', productSchema);

export default Product;
