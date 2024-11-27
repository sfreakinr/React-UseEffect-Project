import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rickAndMorty.css";

const RickAndMorty = () => {
  const [dataType, setDataType] = useState("character");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const rnmUrl = `https://rickandmortyapi.com/api/${dataType}`;
      try {
        const response = await axios.get(rnmUrl);
        setItems(
          response.data.results.map((item) => ({ id: item.id, name: item.name }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataType]);

  return (
    <div className="app-container">
      <h1 className="headline">Rick and Morty API</h1>
      <div className="dropdown-container">
        <label htmlFor="dataType" className="dropdown-label">Select Data Type:</label>
        <select
          id="dataType"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          className="dropdown"
        >
          <option value="character">Characters</option>
          <option value="episode">Episodes</option>
          <option value="location">Locations</option>
        </select>
      </div>
      <div className="list-container">
        {items.map((item) => (
          <div key={item.id} className="list-item">
            <h4>ID: {item.id}</h4>
            <p>Name: {item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RickAndMorty;
