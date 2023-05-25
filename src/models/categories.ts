import { Schema, Document, model } from 'mongoose';
import slugifyMongoose from 'slugify-mongoose';

export interface ICategory extends Document {
  slug: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema<ICategory> = new Schema(
  {
    slug: { type: String, slug: 'name', unique: true },
    name: { type: String, maxLength: 255, required: true, unique: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.plugin(slugifyMongoose);

const Category = model<ICategory>('Categories', categorySchema);

export default Category;
