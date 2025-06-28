import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);

  const getPrayerTimes = async () => {
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
    <div style={{ padding: 20 }}>
      <h1>Prayer Time App</h1>

      <input
        type="text"
        placeholder="Voer je stad in (bijv. Amsterdam)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getPrayerTimes}>Toon gebedstijden</button>

      {prayerTimes && (
        <ul>
          {Object.entries(prayerTimes).map(([name, time]) => (
            <li key={name}>
              {name}: {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
