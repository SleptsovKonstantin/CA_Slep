import axios from "axios";
import React, { useEffect, useState } from "react";

import "./style.css";

const ListWithDeleting: React.FC = () => {
  const [listItems, setListItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("https://swapi.dev/api/people/?page=1");
        setListItems(response.data.results);
      } catch (error) {
        console.error("error from one task", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (index: number) => {
    setListItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        width: "35vw",
        height: "35vh",
        background: "azure",
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto"
      }}
    >
      <div style={{ width: "15vw" }}>
        <ul className="list">
          {listItems.map((user: any, index) => (
            <li key={index}>
              {user.name}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListWithDeleting;
