/** @format */

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { UnitDto } from "../dtos/unitDTO";
import { useParams, Navigate, useNavigate } from "react-router-dom";

let unit: UnitDto = new UnitDto();
interface Prpos {
  id: number; // input
  onclick: () => {}; // output
}
const CarTypesUpsert: React.FC<Prpos> = (props) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (id) {
      Axios.get("http://localhost:3000/unit/getById/" + id)
        .then((response) => {
          if (response.data.success) {
            unit = response.data.data;
            setName(unit.name);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let axios;
    if (id) {
      unit.name = name;
      axios = Axios.put("http://localhost:3000/unit/update", unit);
    } else {
      unit.name = name;
      unit.createdBy = 9;
      axios = Axios.post("http://localhost:3000/unit/insert", unit);
    }

    axios
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
          navigate("/", { replace: true });
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>نام را وارد کنید:</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success my-2 float-lg-start">
        ثبت
      </button>
    </form>

    // <form onSubmit={handleSubmit}>
    //   <label>
    //     نام را وارد کنید:
    //     <input
    //       type="text"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //   </label>
    //   <input type="submit" className="btn btn-success" value="ثبت"/>
    // </form>
  );
};

export default CarTypesUpsert;
