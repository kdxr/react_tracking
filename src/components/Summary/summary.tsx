import { Button, Descriptions, Table, Col, Row } from "antd";
import Axios from "axios";
import React, { useEffect, useState, useContext, useReducer } from "react";
import { SelectProducts } from "../../components/select-products/SelectProducts";
import Preview from "../../views/pages/PDF/Document";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Usercontext, * as user from "../../contexts/user-context";
import moment from "moment";
import Column from "antd/lib/table/Column";
import { Collapse } from "antd";
import { DatePicker, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';

var arrayTime: any = [];
var arrayModule: any = [];
var namearray: any = [];

const Summary = () => {
  const [products, setproducts] = useState([]); //ข้อมูลโปรดัก
  const [stateUser, dispatchUser] = useReducer(user.reducer, user.initState);
  const [selectproduct, setselectproduct] = useState({});
  const [dataAll, setdataAll] = useState([]);
  const [name, setname] = useState([]);
  const [module, setmodule] = useState([]);
  const [summary, setsummary] = useState("");
  const [sumCost, setsumCost] = useState(Number);
  const [costDetail, setcostDetail] = useState([]);
  const [All, setAll] = useState([]);

  const [dateStart, setdateStart] = useState(); //ข้อมูลการเลือกวันจากปฎิทิน //เริ่ม
  const [dateEnd, setdateEnd] = useState(); //ข้อมูลการเลือกวันจากปฎิทิน //จบ
  const [dataofDate, setdataofDate] = useState([]);

  const { RangePicker } = DatePicker;
  const ID = stateUser?.user.id;

  const gotoDetail = useHistory();

  const Allproduct = () => {
    useEffect(() => {
      Axios({
        url: `http://kdxr.xyz:7777/tracking_api/products/GetProduct`,
        method: "GET",
      })
        .then((res) => {
          setproducts(res.data.data);
        })
        .catch((err) => console.log(err));
    }, []);

    return products;
  };

  //get cost
  const costData = () => {
    return sumCost;
  };

  //GetDate of the days
  //====================================================================================================

  useEffect(() => {
    //if (typeof selectproduct === "number" && dateStart) 
		
	const param = {
		UserID : stateUser?.user.id,
		ProductId : typeof selectproduct === "number" ? selectproduct : 0,
		CompanyId : 0,
		Date : typeof dateStart !== "undefined" ? dateStart : 0 ,
		Date_To : typeof dateEnd !== "undefined" ? dateEnd : null
	}
      Axios({
        url: `http://kdxr.xyz:7777/tracking_api/tracking/SummaryTrackingDay`,
        data: param,
        method: "PUT",
      })
        .then((res) => {
          const result = res.data.data;
          let dateData: any = []

          for (const key in result) {
            if (Object.prototype.hasOwnProperty.call(result, key)) {
              const element = result[key];

              // ***************   ให้ API ส่งวันที่มาใหม่ ให้ตัวขั้นเป็น :  ************

             /* let timeBefore: String = element.time;

              let split: String[] = timeBefore.split(":");
              let hour = split[0];
              let min = split[1];
              let se = split[2];

              let formateTime: String = " ";

              if (hour !== "0") {
                formateTime += " " + hour + " hours";
              }
              if (min !== "0") {
                formateTime += " " + min + " minutes";
              }
              if (se) {
                formateTime += " " + se + " seconds";
              }*/
				let formateTime: String = element.time === "" ? "ระบบยังไม่คำนวณเวลาในวันนี้" : element.time
			  // ***************   end logic of chang formate time  ************
              

// fix formate cost  ******************************
				let cost = element.cost > 0 ? element.cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + " บาท" : "ยังไม่มีค่าใช่จ่ายในวันนี้";

				/*let cost;
				if (costBefore > 0) {
				let costDeci = costBefore.toFixed(2);
				cost =
				  costDeci.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + " บาท";
				} else {
				cost = "ยังไม่มีค่าใช่จ่ายในวันนี้";
				}*/
              // end logic set formate of cost  ******************************

              // fix formate of date  ******************************
            
				const setDate = moment(element.date).format("YYYY-MM-DD")
				const d = new Date (setDate)
				const set =  d.toLocaleDateString("th-TH",{
				year: "numeric",
				month: "long",
				day: "numeric"
				});

				const setP = moment(element.date).format("YYYY-MM-DD")
				const P = new Date (setP)

				dateData.push({
					date: set,
					cost: cost,
					time: formateTime,
					datePash: setP
				});
            }
          }
          setdataofDate(dateData);

          // end of ////////////////////////////////////////////////////////////////////



        /*  arrayModule = [];
          for (var prop in result) {
            if (!result.hasOwnProperty(prop)) continue;
            for (var propE in result[prop]) {
              setdataAll(result[prop]);
              setname(result[prop][propE].product_name);
              arrayModule.push({
                nameofmodule: result[prop][propE].name,
                days: result[prop][propE].summary.days,
                hours: result[prop][propE].summary.hours,
                minutes: result[prop][propE].summary.minutes,
                seconds: result[prop][propE].summary.seconds,
              });
            }
          }
          setmodule(arrayModule); */
        })
        .catch((err) => console.log(err));

      //Get Cost ========================================

     /* Axios({
        url: `${process.env.REACT_APP_API_URL}/cost/getcost/`,
        data: { ProductId: selectproduct, UserId: ID },
        method: "PUT",
      })
        .then(async (res) => {
          let moduleData = res.data.data;

          let cost = 0;
          let name: any = [];

          for (let index = 0; index < moduleData.length; index++) {
            const element = moduleData[index];
            cost += element.cost;
            const DataDate = new Date(element.date_onsite);
            const result = DataDate.toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            name.push({
              date: result,
              detail: element.des_data,
              cost: element.cost,
            });
          }
          setAll(name);
          //console.log("ชื่ออออออออออ",All)
          setsumCost(cost);
          setcostDetail(name);
        })
        .catch((err) => console.log(err));*/
  }, [selectproduct, dateStart, dateEnd]);

  const AAA = () => {
    var arrayAllModule: any = [];
    for (let index = 0; index < module.length; index++) {
      const element = module[index];
      let showingtime = "";
      if (element["days"]) {
        showingtime += " " + element["days"] + " days";
      }
      if (element["hours"]) {
        showingtime += " " + element["hours"] + " hours";
      }
      if (element["minutes"]) {
        showingtime += " " + element["minutes"] + " minutes";
      }
      if (element["seconds"]) {
        showingtime += " " + element["seconds"] + " seconds";
      }
      //if times not start
      if (showingtime == "") {
        showingtime += "00 : 00 : 00";
      }
      arrayAllModule.push(
        <>
          <p>
            {" "}
            {element["nameofmodule"]}
            <br></br>
            {showingtime}
            {""}
            <br></br>
          </p>
        </>
      );
    }
    return arrayAllModule;
  };

  //function of select calendar
  function onChange(dates: any, dateStrings: any) {
    console.log("From: ", dates[0], ", to: ", dates[1]); //sun dec 06 2020 20:22:46 GMT+0700
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]); // 2020-12-06
    let dateStsrt = dateStrings[0];
    let dateEnd = dateStrings[1];
    setdateStart(dateStsrt);
    setdateEnd(dateEnd);
  }
  ///

  function go(duedate: any) {
    //console.log("j",duedate.toLocaleString())
    const dayex = moment(duedate).add(1, "days");
    const dateTopath1 = duedate.toLocaleString();
    const dateTopath2 = dayex.toLocaleString();
    console.log(dayex.toLocaleString());
    gotoDetail.push({
      pathname: "/cardDetail",
      state: { dateSelect1: dateTopath1, dateSelect2: dateTopath2 },
    });
  }
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "Date",
    },
    {
      title: "รวมเวลาทั้งหมดในวันนั้น",
      dataIndex: "time",
      key: "time",
	  render: (timeval : any) =>(
		<span style={{ float: "inherit" }}> {/*KdxR*/}
			{timeval}
		</span>
	  )
    },
    {
      title: "cost ทั้งหมดในวันนั้น",
      dataIndex: "cost",
      key: "cost",
	  render: (costval : any) =>(
		<span style={{ float: "right" }}> {/*KdxR*/}
			{costval}
		</span>
	  )
    },
    {
      title: "",
      dataIndex: "datePash",
      key: "action",
      render: (trecord: any) => (
        <Space size="middle">
		  <Button onClick={(e) => go(trecord)}  type="primary" shape="circle" icon={<SearchOutlined />} />
        </Space>
      ),
    },
    // {
    //   title: "Cost",
    //   dataIndex: "cost",
    //   key: "cost",

    //   render: (recost: number) => {
    //     const result = recost.toFixed(2)
    //     return result.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //   },

    // },
  ];

  // function gotoDetail( {
  //   //console.log(tkid)
  //   // goto.push({pathname:"/history"})
  //   gotoDetail.push({ pathname: "/history", state: { trackingId: tkid } });
  // }

  return (
    <div className="site-layout-content">
      <SelectProducts data={Allproduct()} setselectProduct={setselectproduct} />

      <RangePicker
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
        }}
        onChange={onChange}
        style={{ marginLeft: "40px" }}
      />

      <Descriptions
        title={name}
        layout="vertical"
        bordered
        column={{ md: 2, sm: 2 }}
        style={{ marginTop: "50px" }}
      >
        <Descriptions.Item label="ผลรวมเวลาของแต่ละcompanyของทุกๆวัน">
          {summary}
        </Descriptions.Item>

        <Descriptions.Item label="ผลรวมcost แต่ละcompanyของทุกๆวัน">
          {AAA()}
        </Descriptions.Item>
      </Descriptions>

      <Table
        columns={columns}
        dataSource={dataofDate}
        // footer={ () =>
        // {
        //   return(
        //   <>

        // <b> <i style={{float : "right", verticalAlign : "middle",
        //                 paddingBottom: 20, lineHeight : 1.5, marginRight: "10rem"}}>
        //                 {sumCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') } Bath
        //                 </i></b>
        // <br></br>
        // </>
        // )}
        // }
        pagination={{
          defaultCurrent: 1,
          size: "small",
          defaultPageSize: 5,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};
export default Summary;
