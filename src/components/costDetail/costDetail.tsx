import { Button, Table } from "antd";
import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { SelectProducts } from "../../components/select-products/SelectProducts";
import Preview from "../../views/pages/PDF/Document";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import UserContext from "../../contexts/user-context";
import moment from "moment";
import { fail } from "assert";

const Costdetail = (pastValue: any) => {
  const match = useRouteMatch();
  const [costs, setCosts] = useState([]);
  const history = useHistory();


  let pid = pastValue.location.state.pdid; 

  //const set = localStorage.setItem("Cost",`${costs}`);
  

  const { dispatchUser, stateUser } = useContext(UserContext);

  useEffect(() => {
    if (typeof pid !== "undefined" && typeof pid == "number") {
      console.log("ไอดีจ้าาา", pid);
      Axios({
        url: `${process.env.REACT_APP_API_URL}/cost/getcost`,
        data: { ProductId: pid },
        method: "PUT",
      })
        .then(async (res) => {
          setCosts(res.data.data);
          console.log("oooooooooooooo", res.data);
          dispatchUser &&
            dispatchUser({
              type: "setCostDetails",
              payload: res.data.data,
            });
        })
        .catch((err) => console.log(err));
    }
    console.log("POPO");
  }, [pid]);

  const gotoPrint = () => {};

  ///function SumCost

  let Sum = 0;
  for (let index = 0; index < costs.length; index++) {
    const element = costs[index];
    Sum += element["cost"];
  }

  ///function pdf

  const onclickviewPDF = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  const showSum = () => {
    let Sum = 0;
    for (let index = 0; index < costs.length; index++) {
      const element = costs[index];

      Sum += element["cost"];
    }
    if (Sum > 0 && typeof pid == "number")
      return "Sumary Cost: " + Sum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " ฿";
    else return "";
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Detail",
      dataIndex: "des_data",
      key: "detail",
    },
    {
      title: "Date",
      dataIndex: "date_onsite",
      key: "date",

      render: (redate: Date) => {
        const DataDate = new Date(redate);
        const result = DataDate.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return result;
      },
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",

      render: (recost: number) => {
        const costDeci = recost;
        const result = costDeci.toFixed(2)
        return result.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
  ];

  return (
    <div className="site-layout-content">
      <span style={{ marginRight: "0vw", float: "right", marginBottom: "3vw"}}>
        <b> {showSum()} </b>
      </span>
      <Table
        columns={columns}
        dataSource={costs}
        pagination={{ defaultCurrent: 1, size:"small", defaultPageSize:5, showSizeChanger: false }}
        
      />
      {/* <Button type="primary" htmlType="button" onClick={onclickviewPDF}  >
            Print
  </Button> */}

      <Link to={`preview?pdid=${pid}`} target="_blank">
        <Button
          type="primary"
          style={{ width: "10vw", marginLeft: "3vw", marginTop: "2vw", float: "right" }}
        >
          Print
        </Button>
      </Link>

      <Link to='/cost'>
        <Button
        type="primary"
        style={{ width: "10vw", marginTop: "2vw", float: "right" }}
        >
          Additional cost
        </Button>
      </Link>
      {/* {Sum} */}
    </div>
  );
};
export default Costdetail;
