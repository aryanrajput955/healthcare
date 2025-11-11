'use client'
import { useState } from 'react';


const UserJourneyForm = () => {
  const [journeyCode, setJourneyCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!journeyCode) {
      setMessage('Please select a journey type.');
      return;
    }

    const payload = {
      userId: 2,
      journeyCode: journeyCode,
    };

    try {
      const response = await fetch('https://api.indiem.tech/user-journey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage('Journey submitted successfully!');
        setJourneyCode('');
      } else {
        setMessage('Failed to submit journey. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Your Journey</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="journeyCode" className="block text-sm font-medium text-gray-700">
              Journey Type
            </label>
            <select
              id="journeyCode"
              value={journeyCode}
              onChange={(e) => setJourneyCode(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="" disabled>
                Select a journey
              </option>
              <option value="CHASLESS">Chaseless Journey</option>
              <option value="REIMBURSEMENT">Reimbursement Journey</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit Journey
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>

  );
};

export default UserJourneyForm;