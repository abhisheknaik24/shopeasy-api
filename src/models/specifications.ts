import { Schema, model, Document, Types } from 'mongoose';

export interface ISpecification extends Document {
  product: Types.ObjectId;
  specification: any;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const specificationSchema: Schema<ISpecification> = new Schema<ISpecification>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
    specification: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Specification = model<ISpecification>(
  'Specifications',
  specificationSchema
);

export default Specification;
