

import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  ProductsOrdered: [
    {
      type: Object,
      required: true
    }
  ],

  email: {
    type: String,
    required: true
  },

  credCardNum: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  cardType: {
    type: String,
    required: true
  },

  zipCode: {
    type: String,
    required: true
  },

  expirationDate: {
    type: String,
    required: true
  },

  CVV: {
    type: String,
    required: true
  },

  pickupTime: {
    type: String,
    required: false
  },

  city: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  Order_complete: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Order", ordersSchema);