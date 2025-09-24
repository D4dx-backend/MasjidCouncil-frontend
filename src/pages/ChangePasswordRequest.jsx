import React, { useState } from "react";

const ChangePasswordRequest = () => {
  const [form, setForm] = useState({
    currentPhone: "",
    newPhone: "",
    area: "",
  });

  const [status, setStatus] = useState("Pending");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send this data to backend to be stored as a request
    console.log("Submitted form:", form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Change Password Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">
              Current Phone Number
            </label>
            <input
              type="text"
              name="currentPhone"
              value={form.currentPhone}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              New Phone Number
            </label>
            <input
              type="text"
              name="newPhone"
              value={form.newPhone}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Area</label>
            <input
              type="text"
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Send Request
          </button>
        </form>

        {submitted && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-700">
            Request submitted! Status: <strong>{status}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordRequest;
