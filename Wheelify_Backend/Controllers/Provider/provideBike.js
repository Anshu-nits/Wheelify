import mongoose from "mongoose";
import Bike from "../../Models/Bike.js";
import User from "../../Models/User.js";

const provideBike = async (req, res) => {
    /*
   "bikeId": "679483db8d9e214889a30c43",
   "rentAmount":"20",
   "availableTimeFrom":"12",
   "availableTimeTill":"18",
   "availableDateFrom":"21",
   "availableDateTill":"25",
   "location":"silchar"
    */
  try {
    // Get user ID from the request object
    const userId = req.user.id;

    // Get bikeId, rent details, availability, and location from the request body
    const {
      bikeId,
      rentAmount,
      availableTimeFrom,
      availableTimeTill,
      availableDateFrom,
      availableDateTill,
      location,
    } = req.body;

    // Validate the input
    if (
      !bikeId ||
      !rentAmount ||
      !availableTimeFrom ||
      !availableTimeTill ||
      !availableDateFrom ||
      !availableDateTill ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (bikeId, rentAmount, availability times/dates, and location) are required.",
      });
    }

    // Convert bikeId to ObjectId
    const bikeObjectId = new mongoose.Types.ObjectId(bikeId);

    // Check if the user owns the bike
    const user = await User.findById(userId).populate("registeredBikes");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const ownsBike = user.registeredBikes.some(
      (bike) => bike._id.toString() === bikeId
    );
    if (!ownsBike) {
      return res.status(403).json({
        success: false,
        message:
          "You can only create rentable posts for your registered vehicles.",
      });
    }

    // Find the bike and check its status
    const bike = await Bike.findById(bikeObjectId);
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found.",
      });
    }

    // Check if the bike is already provided for rent
    if (bike.status === "provided for rent") {
      return res.status(400).json({
        success: false,
        message: "This bike is already provided for rent.",
      });
    }

    // Add rental details and availability to the bike
    bike.rentAmount = rentAmount;
    bike.availableTimeFrom = availableTimeFrom;
    bike.availableTimeTill = availableTimeTill;
    bike.availableDateFrom = availableDateFrom;
    bike.availableDateTill = availableDateTill;
    bike.location = location;
    bike.status = "provided for rent"; // Update the bike's status
    await bike.save();

    // Update the user's providedBikes array
    if (!user.providedBikes.includes(bikeObjectId)) {
      user.providedBikes.push(bikeObjectId);
    }

    // Add the bike to the user's rental history
    user.rentalHistory.push({
      bike: bikeObjectId,
      action: "provided for rent",
      timestamp: new Date(),
    });

    await user.save();

    // Respond with success and updated bike details
    res.status(201).json({
      success: true,
      message:
        "Rentable post created successfully, bike status updated, and added to your rental history.",
      bike,
    });
  } catch (error) {
    // Handle any errors during the process
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create rentable post.",
      error: error.message,
    });
  }
};

export default provideBike;
