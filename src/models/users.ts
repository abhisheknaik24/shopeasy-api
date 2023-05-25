import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  picture?: string;
  isGoogleAuthLogin: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstName: { type: String, maxLength: 255, required: true },
    lastName: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true, unique: true },
    password: { type: String, maxLength: 255 },
    picture: { type: String, maxLength: 255 },
    isGoogleAuthLogin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = model<IUser>('Users', userSchema);

export default User;
