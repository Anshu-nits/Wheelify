import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const SearchForm = () => {
  return (
    <section className="text-center py-16 bg-[#f0f9f4]">
      <h2 className="text-4xl font-bold text-green-900 mb-4">Find Your Perfect Bike</h2>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        Search for available bikes in your area and book instantly
      </p>

      <form className="bg-white rounded-xl shadow-md p-8 w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 font-semibold text-green-900 mb-2">
            <FaCalendarAlt /> Desired Date
          </label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="mm/dd/yyyy"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 font-semibold text-green-900 mb-2">
            <FaMapMarkerAlt /> Location
          </label>
          <input
            type="text"
            placeholder="Enter your location"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 font-semibold text-green-900 mb-2">
            <FaClock /> Desired Time From
          </label>
          <input
            type="time"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 font-semibold text-green-900 mb-2">
            <FaClock /> Desired Time Till
          </label>
          <input
            type="time"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-green-400 hover:bg-green-500 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2"
        >
          <FaSearch /> Search Bikes
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
