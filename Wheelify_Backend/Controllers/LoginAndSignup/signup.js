import User from "../../Models/User.js";

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Validation passed" });
  } catch (error) {
    console.error("Error validating user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default signup;

// import bcrypt from "bcrypt";
// import User from "../../Models/User.js";
// import Profile from "../../Models/Profile.js";
// import OTP from "../../Models/OTP.js";

// const signup = async (req, res) => {
//   try {
//     /*
//         1.extract details from body
//         2.check if all details are available or not
//         3.check if password and confirm password match
//         4.check if user already exists
//         **SEND OTP VIA ROUTE
//         5.find the most recent OTP for the email
//         6.Hash the password
//         7.create the additional profile for user
//         8.create the user

    // "name" : "Abhay",
    // "email":"abhaydasad78@gmail.com",
    // "password":"12345",
    // "confirmPassword":"12345",
    // "otp":"348003"
//     */

//     /*---1---*/
//     const { name, email, password, confirmPassword} = req.body;

//     /*---2---*/
//     if (!name || !email || !password || !confirmPassword) {
//         return res.status(403).send({
//             success:false,
//             message:"All fields are required",
//         });
//     }

//     /*---3---*/
//     if(password !== confirmPassword){
//         return res.status(400).json({
//             success: false,
//             message:
//                 "Password and Confirm Password do not match. Please try again.",
//         });
//     }

//     /*--4--*/
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//         return res.status(400).json({
//             success: false,
//             message: "User already exists. Please sign in to continue.",
//         });
//     }

//     /*--5--*/
//     const {otp} = req.body;

//     if (!otp) {
//         return res.status(403).send({
//             success:false,
//             message:"All fields are required",
//         });
//     }

// 		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
// 		console.log(response);
// 		if (response.length === 0) {
// 			// OTP not found for the email
// 			return res.status(400).json({
// 				success: false,
// 				message: "The OTP is not valid",
// 			});
// 		} else if (otp !== response[0].otp) {
// 			// Invalid OTP
// 			return res.status(400).json({
// 				success: false,
// 				message: "The OTP is not valid",
// 			});
// 		}

//     /*--6--*/
//     const hashedPassword = await bcrypt.hash(password, 10);

//     /*--7--*/
//     const profileDetails = await Profile.create({
// 			gender: null,
// 			dateOfBirth: null,
// 			contactNumber: null,
//       address:null,
//       image:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
// 		});

//     /*--8--*/
// 		const user = await User.create({
// 			name,
// 			email,
// 			password: hashedPassword,
// 			additionalDetails: profileDetails._id,
// 		});

// 		return res.status(200).json({
// 			success: true,
// 			user,
// 			message: "User registered successfully",
// 		});

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "User cannot be registered. Please try again.",
//     });
//   }
// };

// export default signup;
