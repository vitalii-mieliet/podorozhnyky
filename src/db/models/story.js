import { model, Schema } from 'mongoose';
import { STORY_CATEGORIES } from '../../constants/validation.js';
import { handleSaveError, setUpdateSetting } from '../hooks.js';

const storiesSchema = new Schema(
  {
    img: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: STORY_CATEGORIES,
      required: true,
    },
    rate: {
      type: Number,
      required: false,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    date: {
      type: String,
      default: () => {
        const now = new Date();
        return now.toISOString().split('T')[0];
      },
    },
  },
  { timestamps: true, versionKey: false },
);

storiesSchema.post('save', handleSaveError);

storiesSchema.pre('findOneAndUpdate', setUpdateSetting);

storiesSchema.post('findOneAndUpdate', handleSaveError);

export const StoriesCollection = model('stories', storiesSchema);
