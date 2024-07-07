import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    bonus: { type: String, required: false },
    availability: { type: Boolean, required: true },
    wifi: { type: Boolean, required: true },
    bedType: { type: String, required: true },
    size: { type: String, required: true },
    petsAllowed: { type: Boolean, required: true },
    smokingPolicy: {
      type: String,
      enum: ["Smoking", "Non-smoking"],
      required: true,
    },
    cancellationPolicy: { type: String, required: true },
    image: { type: String, required: true,default:"url" },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
