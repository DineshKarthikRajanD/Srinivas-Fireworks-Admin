import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import to useNavigate

const AddCracker = () => {
  const [newCracker, setNewCracker] = useState({
    name: "",
    price: "",
    image: "",
    crackerType: "", // Added cracker type
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
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Add New Cracker 🎆
      </h1>
      <div className="mb-6">
        <input
          type="text"
          name="name"
          value={newCracker.name}
          onChange={handleChange}
          placeholder="Cracker Name"
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          name="price"
          value={newCracker.price}
          onChange={handleChange}
          placeholder="Cracker Price"
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          name="image"
          value={newCracker.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          name="crackerType"
          value={newCracker.crackerType}
          onChange={handleChange}
          placeholder="Cracker Type"
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handleAddCracker}
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Add Cracker
        </button>
      </div>
    </div>
  );
};

export default AddCracker;
