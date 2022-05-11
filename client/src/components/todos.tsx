/** @format */

import React, { useEffect, useState } from "react";
import Axios from "axios";

const Todos = () => {
  const [data, setdata] = useState<any[]>([]);
  const [data1, setdata1] = useState<any[]>([]);

  const [count, setCount] = useState(1);

  useEffect(() => {
    Axios.get("http://localhost:3000/todos").then((rec) => {
      setdata(rec.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3000/todos").then((rec) => {
      setdata1(rec.data);
    });
  }, []);
  
  return (
    <>
      <button onClick={(e) => setCount((pre) => pre + 1)}>
        {"mehdi"}
        count change {count}
      </button>
      {data.map((rec) => (
        <div key={rec.text}>{rec.text}</div>
      ))}
      <hr />
      {data1.map((rec) => (
        <div key={rec.text}>{rec.text}</div>
      ))}
    </>
  );
};

export default Todos;
