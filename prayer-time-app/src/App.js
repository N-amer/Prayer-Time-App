import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);

  const getPrayerTimes = async () => {
    if (!city) {
    //  message the user to enter a city in red color
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Voer een stad in.";
    errorMessage.style.color = "red";
      return;
    }
    // Clear previous error message
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";
 
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Netherlands&method=2`
      );
      const data = await response.json();
      setPrayerTimes(data.data.timings);
    } catch (error) {
      console.error("Fout bij ophalen:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-2xl shadow-xl text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Prayer Time App</h1>

      <input
        type="text"
        placeholder="Voer je stad in..."
        value={city}
        className="w-full p-2 border border-gray-300 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getPrayerTimes} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Toon gebedstijden</button>

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
      <div id="error-message" className="text-red-500 mt-4"></div>
    </div>
  );
}

export default App;
