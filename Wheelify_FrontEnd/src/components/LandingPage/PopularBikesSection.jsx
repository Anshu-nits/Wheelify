import React from 'react';

const bikes = [
  { name: "Mountain Explorer", type: "Mountain Bike", price: "$15/day", rating: 4.8 },
  { name: "City Cruiser", type: "City Bike", price: "$12/day", rating: 4.6 },
  { name: "Speed Demon", type: "Road Bike", price: "$20/day", rating: 4.9 },
  { name: "Electric Glide", type: "E-Bike", price: "$25/day", rating: 4.7 },
];

const PopularBikes = () => {
  return (
    <section className="py-16 text-center bg-green-50">
      <h2 className="text-3xl font-bold text-green-900 mb-4">Popular Bikes</h2>
      <p className="text-gray-700 mb-10">Choose from our most loved bikes for your next adventure</p>
      <div className="flex flex-wrap justify-center gap-6">
        {bikes.map((bike, index) => (
          <div
            key={index}
            className="bg-white rounded-xl w-64 p-4
              transition-transform transform hover:scale-105 duration-300
              shadow-[10px_0_15px_rgba(0,0,0,0.1),_-10px_0_15px_rgba(0,0,0,0.1),_0_10px_20px_rgba(0,0,0,0.1)]"
          >
            <div className="bg-gray-200 h-32 rounded-md mb-4 flex justify-center items-center">
              <span className="text-gray-500">Image</span>
            </div>
            <h3 className="font-semibold text-green-900 text-lg">{bike.name}</h3>
            <p className="text-green-600 font-semibold">{bike.price}</p>
            <p className="text-gray-600">{bike.type}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-yellow-500 font-bold">⭐ {bike.rating}</span>
              <button className="bg-green-500 text-white rounded-md px-3 py-1 hover:bg-green-600">Rent Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBikes;
