import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import to useNavigate

const Crackers = () => {
  const [groupedCrackers, setGroupedCrackers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Using useNavigate for navigation

  useEffect(() => {
    const fetchCrackers = async () => {
      try {
        const res = await axios.get("https://srinivas-fireworks-backend.onrender.com/api/admin/crackers");
        setGroupedCrackers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching crackers:", err);
        setLoading(false);
      }
    };

    fetchCrackers();
  }, []);

  const handleAddCrackerClick = () => {
    navigate("/add-cracker");
  };

  const handleUpdateClick = (id) => {
    navigate(`/update-cracker/${id}`); // Assuming you have an update page with this route
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `https://srinivas-fireworks-backend.onrender.com/api/admin/delete-cracker/${id}`
      );
      setGroupedCrackers((prevState) => {
        const newState = { ...prevState };
        Object.keys(newState).forEach((type) => {
          newState[type] = newState[type].filter(
            (cracker) => cracker._id !== id
          );
        });
        return newState;
      });
    } catch (err) {
      console.error("Error deleting cracker:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading crackers...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        🎆 Crackers Collection
      </h1>

      {/* Add Crackers Button */}
      <div className="text-center mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleAddCrackerClick}
        >
          Add Crackers
        </button>
      </div>

      {/* Displaying crackers */}
      {Object.keys(groupedCrackers).map((type) => (
        <div key={type} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{type}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {groupedCrackers[type].map((cracker) => (
              <div
                key={cracker._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={cracker.image}
                  alt={cracker.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-bold">{cracker.name}</h3>
                  <div className="flex gap-[250px]">
                    <p className="text-green-600 font-semibold">
                      ₹{cracker.price}
                    </p>
                    <p className="text-lg text-gray-600 font-bold mt-1">
                      Stock: {cracker.stock}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleUpdateClick(cracker._id)}
                      className="bg-yellow-500 text-white py-1 px-4 rounded-md text-sm hover:bg-yellow-400 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(cracker._id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-md text-sm hover:bg-red-400 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Crackers;
