const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Submitted", "In Progress", "Resolved"], default: "Submitted" },
  adminNote: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
