import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true
  },
  
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  pinned: Boolean
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);
