/** @format */

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const CarTypes = () => {
  const [data, setdata] = useState<any[]>([]);
  const [refresh, setrefresh] = useState<boolean>(false);

  useEffect(() => {
    Axios.get("http://localhost:3000/unit/getAllWithRelations").then((rec) => {
      setdata(rec.data.data);
    });
  }, [refresh]);

  const deleteCarType = (ct_Key) => {
    if (confirm("آیا مطمئنید؟"))
      Axios.delete("http://localhost:3000/unit/delete/" + ct_Key)
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message);
            setrefresh(true);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  };

  return (
    <>
      <Link to={{ pathname: `/upsert` }} className="btn btn-success my-2">
        <i className="fa fa-plus mx-1"></i>جدید
      </Link>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">نام</th>
            <th scope="col">تاریخ ایجاد</th>
            <th scope="col">تاریخ بروزرسانی</th>
            <th scope="col">کاربر</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((rec) => (
            <tr key={rec.ct_Key}>
              <td scope="row">{rec.name}</td>
              <td>{new Date(rec.createdOn).toDateString()}</td>
              <td>{new Date(rec.updatedOn).toDateString()}</td>
              <td>{`${rec.user.u_FirstName} ${rec.user.u_LastName}`}</td>
              <td className="text-center">
                <Link
                  to={{
                    pathname: `/upsert/${rec.ct_Key}`,
                  }}
                  className="btn btn-primary"
                >
                  <i className="fa fa-edit mx-1"></i>ویرایش
                </Link>
                <a
                  className="btn btn-danger mx-1"
                  onClick={() => deleteCarType(rec.ct_Key)}
                >
                  <i className="fa fa-remove mx-1"></i>حذف
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CarTypes;
