import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true 
    },
    avatar: { 
      type: String,
    },
  },
  { collection: 'users' },
);
 