/** @format */

import React, { useEffect, useState } from "react";
import Axios from "axios";

const CarTypes = () => {
  const [data, setdata] = useState<any[]>([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/unit/getall").then((rec) => {
      setdata(rec.data);
    });
  }, []);

  return (
    <>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">نام</th>
            <th scope="col">تاریخ ایجاد</th>
            <th scope="col">تاریخ بروزرسانی</th>
            <th scope="col">کاربر</th>
          </tr>
        </thead>
        <tbody>
          {data.map((rec) => (
            <tr>
              <td scope="row">{rec.name}</td>
              <td>{new Date(rec.createdOn).toDateString()}</td>
              <td>{new Date(rec.updatedOn).toDateString()}</td>
              <td>{rec.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CarTypes;
