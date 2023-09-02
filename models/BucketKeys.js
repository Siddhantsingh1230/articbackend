import mongoose from "mongoose";

const bucketSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const bucketModel = mongoose.model("bucketkeys", bucketSchema);
