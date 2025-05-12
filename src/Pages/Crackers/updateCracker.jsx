import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Added useParams to get the cracker ID

const UpdateCracker = () => {
  const { id } = useParams(); // Get the cracker ID from the URL params
  const [cracker, setCracker] = useState({
    name: "",
    price: "",
    image: "",
    crackerType: "",
    stock: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCracker = async () => {
      try {
        const res = await axios.get(
          `https://srinivas-fireworks-backend.onrender.com/api/admin/update-cracker/${id}`
        );
        setCracker(res.data);
      } catch (err) {
        console.error("Error fetching cracker details:", err);
      }
    };

    fetchCracker();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCracker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCracker = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://srinivas-fireworks-backend.onrender.com/api/admin/update-cracker/${id}`,
        cracker
      );
      navigate("/admin/crackers");
    } catch (err) {
      console.error("Error updating cracker:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Update Cracker</h1>
      <form onSubmit={handleUpdateCracker}>
        <div className="mb-6">
          <input
            type="text"
            name="name"
            value={cracker.name}
            onChange={handleChange}
            placeholder="Cracker Name"
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            name="price"
            value={cracker.price}
            onChange={handleChange}
            placeholder="Cracker Price"
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            name="image"
            value={cracker.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="text"
            name="crackerType"
            value={cracker.crackerType}
            onChange={handleChange}
            placeholder="Cracker Type"
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="number"
            name="stock"
            value={cracker.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Update Cracker
        </button>
      </form>
    </div>
  );
};

export default UpdateCracker;
