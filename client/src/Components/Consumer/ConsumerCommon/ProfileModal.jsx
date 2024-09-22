import React from "react";

const ProfileModal = ({ isOpen, onClose, onEdit, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture */}
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-full w-24 h-24"
          />

          {/* Display user details */}
          <div className="w-full space-y-4">
            <div className="w-full">
              <label className="block font-semibold mb-1">Name</label>
              <p className="border p-2 w-full rounded bg-gray-100">
                {user.name}
              </p>
            </div>

            <div className="w-full">
              <label className="block font-semibold mb-1">Email</label>
              <p className="border p-2 w-full rounded bg-gray-100">
                {user.email}
              </p>
            </div>

            <div className="w-full">
              <label className="block font-semibold mb-1">Phone</label>
              <p className="border p-2 w-full rounded bg-gray-100">
                {user.phone}
              </p>
            </div>

            <div className="w-full">
              <label className="block font-semibold mb-1">Address</label>
              <p className="border p-2 w-full rounded bg-gray-100">
                {user.address}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded mx-1"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="bg-gray-300 text-black px-4 py-2 rounded mx-1"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
