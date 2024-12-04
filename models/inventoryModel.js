const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type is required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    status: {
      type: String,
      required: [true, "status is required"],
      enum: ["urgent", "normal", "resolved", "Pending", "Not fully resolved", "fulfilled"],
      default: "Pending",
    },
    quantity: {
      type: Number,
      required: [true, "blood quantity is required"],
    },
    donorEmail: [
      {
        type: String,
        required: true,
        validate: {
          validator: function (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
          },
          message: "Invalid email format",
        },
      },
    ],
    location: {
      type: String,
      required: [true, "location is required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "organisation is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
