const mongoose = require('mongoose');

const campSchema = new mongoose.Schema(
  {
    organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    organization: { type: String, required: true },
    place: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    contact: { type: String, required: true },
    details: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Camps', campSchema);
