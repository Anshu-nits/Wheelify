import { useEffect, useState, useContext } from "react";
import {
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";

const MyProfileComponent = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/get-profile-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setProfile(response.data.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [token]);

  if (!profile) {
    return <div className="text-center mt-16">Loading profile...</div>;
  }

  const { firstName, lastName, email, additionalDetails } = profile;
  const { gender, dob, phoneNumber, address } = additionalDetails || {};

  return (
    <div className="max-w-4xl mx-auto my-16 p-8 rounded-xl shadow-[0_5px_30px_rgba(0,0,0,0.1)] bg-gradient-to-r from-green-100 via-green-200 to-green-100">
      {/* Profile Header */}
      <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md">
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl bg-gradient-to-r from-green-500 to-green-700 shadow-inner">
          <FaUser />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{`${firstName} ${lastName}`}</h1>
          <p className="text-sm">{email}</p>
          <span className="inline-block mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {gender}
          </span>
        </div>
      </div>

      {/* Info Sections */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-900">
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="rounded-md p-4 bg-white">
              <label className="text-sm text-green-800 block mb-1">
                Full Name
              </label>
              <div className="flex items-center gap-2 text-green-900 font-medium">
                <FaUser /> {`${firstName} ${lastName}`}
              </div>
            </div>
            <div className="rounded-md p-4 bg-white">
              <label className="text-sm text-green-800 block mb-1">
                Email Address
              </label>
              <div className="flex items-center gap-2 text-green-900 font-medium">
                <FaEnvelope /> {email}
              </div>
            </div>
            <div className="rounded-md p-4 bg-white">
              <label className="text-sm text-green-800 block mb-1">
                Password
              </label>
              <div className="flex items-center gap-2 text-green-900 font-medium">
                <FaLock /> ********{" "}
                <button className="ml-auto text-blue-500 text-sm">
                  Change
                </button>
              </div>
            </div>
            <div className="rounded-md p-4 bg-white">
              <label className="text-sm text-green-800 block mb-1">
                Date of Birth
              </label>
              <div className="flex items-center gap-2 text-green-900 font-medium">
                <FaCalendarAlt /> {dob}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-900">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="rounded-md p-4 bg-white">
              <label className="text-sm text-green-800 block mb-1">
                Phone Number
              </label>
              <div className="flex items-center gap-2 text-green-900 font-medium">
                <FaPhone /> {phoneNumber}
              </div>
            </div>
            <div className="rounded-md p-4 bg-white">
              <label className="text-sm text-green-800 block mb-1">
                Address
              </label>
              <div className="flex items-center gap-2 text-green-900 font-medium">
                <FaMapMarkerAlt /> {address}
              </div>
            </div>
            <div className="rounded-md p-4 bg-blue-50">
              <label className="text-sm text-blue-800 block mb-1">
                Account Status
              </label>
              <div className="flex items-center gap-2 text-blue-800 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                Active Account
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileComponent;
