import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/auth.js';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, ematch: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String },
    onboardingCompleted: { type: Boolean, default: false },
    savedStories: [{ type: Schema.Types.ObjectId, ref: 'stories' }],
    settings: {
      darkMode: { type: Boolean, default: false },
    },
    socialLinks: {
      twitter: { type: String, default: '' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSetting);

userSchema.post('findOneAndUpdate', handleSaveError);

export const UserCollection = model('user', userSchema);
