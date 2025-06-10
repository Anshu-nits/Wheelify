import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
  company: {
    type: String,
  },
  model: {
    type: String,
  },
  price: {
    type: Number,
  },
  age: {
    type: Number,
  },
  ownershipProof: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  img: {
    type: String,
  },
  rentAmount: {
    type: Number,
  },
  availableTimeFrom: {
    type: Number,
  },
  availableTimeTill: {
    type: Number,
  },
  availableDateFrom: {
    type: Number,
  },
  availableDateTill: {
    type: Number,
  },
  location: {
    type: String,
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      review: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Bike = mongoose.model("Bike", bikeSchema);
export default Bike;
