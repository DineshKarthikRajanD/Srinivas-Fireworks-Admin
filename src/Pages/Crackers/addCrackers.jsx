import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCracker = () => {
  const [newCracker, setNewCracker] = useState({
    name: "",
    price: "",
    image: "",
    crackerType: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCracker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCracker = async () => {
    try {
      await axios.post(
        "https://srinivas-fireworks-backend.onrender.com/api/admin/add-crackers",
        newCracker
      );
      navigate("/admin/crackers");
    } catch (err) {
      console.error("Error adding cracker:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
          Add New Cracker 🎆
        </h1>
        <div className="space-y-5">
          <input
            type="text"
            name="name"
            value={newCracker.name}
            onChange={handleChange}
            placeholder="Cracker Name"
            className="p-3 border border-gray-300 rounded-md w-full text-base"
          />
          <input
            type="number"
            name="price"
            value={newCracker.price}
            onChange={handleChange}
            placeholder="Cracker Price"
            className="p-3 border border-gray-300 rounded-md w-full text-base"
          />
          <input
            type="text"
            name="image"
            value={newCracker.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-3 border border-gray-300 rounded-md w-full text-base"
          />
          <input
            type="text"
            name="crackerType"
            value={newCracker.crackerType}
            onChange={handleChange}
            placeholder="Cracker Type"
            className="p-3 border border-gray-300 rounded-md w-full text-base"
          />
          <button
            onClick={handleAddCracker}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-semibold text-base transition-colors"
          >
            Add Cracker
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCracker;
