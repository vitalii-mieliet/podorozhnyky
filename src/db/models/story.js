import { model, Schema } from 'mongoose';
import { STORY_CATEGORIES } from '../../constants/validation.js';

const storiesSchema = new Schema(
  {
    img: {
      type: String,
      default:
        'https://res.cloudinary.com/dbmy1ukhf/image/upload/q_auto,f_auto/v1758134510/Placeholder_Image.png',
    },
    title: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: STORY_CATEGORIES,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
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

export const StoriesCollection = model('stories', storiesSchema);
