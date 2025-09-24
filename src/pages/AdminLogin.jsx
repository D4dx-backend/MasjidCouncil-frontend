import React from 'react';
import { User } from 'lucide-react'; // Optional icon

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <div className="flex flex-col items-center mb-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <User className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold mt-2">Admin Login</h3>
          <p className="text-sm text-gray-500">അഡ്മിൻ ലോഗിൻ</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number (മൊബൈൽ നമ്പർ)
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter 10-digit mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password (പാസ്വേഡ്)
            </label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter password"
            />
            <p className="text-xs text-gray-500 mt-1">
              Default password: MCK + first 4 digits of mobile number
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
          >
            Login
          </button>
          <button
            type="button"
            className="w-full bg-green-400 hover:bg-green-600 text-white font-semibold py-2 rounded-md mt-2"
            onClick={() => alert('Super Admin Login (not implemented)')}
          >
            Super Admin Login
          </button>
        </form>

        <div className="bg-green-50 p-4 rounded-md mt-6 text-green-700 text-sm">
          <h4 className="font-semibold mb-2">Login Instructions:</h4>
          <ul className="list-disc ml-5 space-y-1">
            <li>Use your registered 10-digit mobile number</li>
            <li>Default password: MCK + first 4 digits of mobile</li>
            <li>Example: Mobile 9876543210 → Password: MCK9876</li>
            <li>Contact State Admin if you need password reset</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
