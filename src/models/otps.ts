import { Schema, model, Document, Types } from 'mongoose';

export interface IOtp extends Document {
  user: Types.ObjectId;
  otp: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const otpSchema: Schema<IOtp> = new Schema<IOtp>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    otp: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Otp = model<IOtp>('Otps', otpSchema);

export default Otp;
