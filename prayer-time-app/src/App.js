import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);

  const getPrayerTimes = async () => {
    // if the city input is empty, set an error message
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setError("");

    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Netherlands&method=2`
      );
      const data = await response.json();

      if (!data.data || !data.data.timings || !data.data.timings.Fajr) {
        setError("Invalid city. Please try again.");
        return;
      }

      setPrayerTimes(data.data.timings);
      setError(""); // Clear previous error
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-2xl shadow-xl text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Prayer Time App</h1>

      <input
        type="text"
        placeholder="Enter your city..."
        value={city}
        className="w-full p-2 border border-gray-300 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getPrayerTimes} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Show Prayer Times</button>

      {prayerTimes && (
        <ul className="mt-6 space-y-2">
          {Object.entries(prayerTimes).map(([name, time]) => (
            <li
              key={name}
              className="flex justify-between items-center p-3 bg-gray-100 rounded shadow-sm hover:bg-green-100 transition duration-200">
              <span className="capitalize font-medium text-gray-800">{name}</span>
              <span className="font-mono text-gray-600">{time}</span>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default App;
