import { model, Schema } from 'mongoose';

const savedArticleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    storyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'stories',
    },
  },
  { timestamps: true, versionKey: false },
);

savedArticleSchema.index({ userId: 1, storyId: 1 }, { unique: true });

export const SavedArticleCollection = model('savedArticle', savedArticleSchema);
