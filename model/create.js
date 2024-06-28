import mongoose from 'mongodb';

// Post Schema
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  Title: {
    type: String,
    required: [true, ' title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  references: {
    type: String,
    required: [true, 'References are required'],
  },
  categories: {
    type: String,
    required: [true, 'Categories are required'],
  },
  posterUrl: {
    type: String,
    required: [true, 'Poster URL is required'],

  },
}, { timestamps: true });

// Create an index on userId for faster lookup
postSchema.index({ userId: 1 });

const Post = mongoose.model('Post', postSchema);

// Comment Schema
const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post ID is required'],
  },

  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create an index on postId for faster lookup
commentSchema.index({ postId: 1 });

const Comment = mongoose.model('Comment', commentSchema);


export { Post, Comment };
