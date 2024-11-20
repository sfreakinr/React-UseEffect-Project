import React, { useState, useEffect } from "react";
import axios from "axios";

const RickAndMorty = () => {
  const [dataType, setDataType] = useState("character"); 
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const rnmUrl = `https://rickandmortyapi.com/api/${dataType}`;
      try {
        const response = await axios.get(rnmUrl);
        setItems(response.data.results.map((item) => ({ id: item.id, name: item.name })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataType]);

  return (
    <div>
      <h1>Rick and Morty API</h1>
      <label htmlFor="dataType">Select Data Type: </label>
      <select
        id="dataType"
        value={dataType}
        onChange={(e) => setDataType(e.target.value)}
      >
        <option value="character">Characters</option>
        <option value="episode">Episodes</option>
        <option value="location">Locations</option>
      </select>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.id} - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RickAndMorty;
