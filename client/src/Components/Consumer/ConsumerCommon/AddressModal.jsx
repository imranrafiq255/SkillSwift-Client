import React, { useState } from "react";

const AddressModal = ({ isOpen, onClose, address, onSave }) => {
  const [newAddress, setNewAddress] = useState(address);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleSubmit = () => {
    if (!newAddress) {
      setError("Address is required");
      return;
    }
    onSave(newAddress);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Address</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="w-full">
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            value={newAddress}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
