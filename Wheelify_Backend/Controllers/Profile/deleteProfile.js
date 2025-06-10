import Profile from "../../Models/Profile.js";
import User from "../../Models/User.js";
import Bike from "../../Models/Bike.js";

const deleteProfile = async (req, res) => {
    try {
        /*--1--*/
        const id = req.user.id;
        
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        /*--2--*/
        // Delete all registered bikes
        if (user.registeredBikes && user.registeredBikes.length > 0) {
            await Bike.deleteMany({ _id: { $in: user.registeredBikes } });
        }

        // Delete rental history
        user.rentalHistory = [];

        // Clear cart
        user.cart = [];

        // Update the user to reflect these changes before deletion
        await user.save();

        /*--3--*/
        // Delete the user's profile
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });

        // Delete the user itself
        await User.findByIdAndDelete({ _id: id });

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User Cannot be deleted successfully",
        });
    }
};

export default deleteProfile;
