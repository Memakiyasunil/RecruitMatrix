import React, { useEffect, useState } from 'react';

export default function CandidatePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder for fetching data
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Candidate Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
          Add New Candidate
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading data...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#12345</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
                  <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
