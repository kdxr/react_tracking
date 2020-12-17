import React, { Component, useContext, useEffect, useState } from "react";
import { Table, Tag, Space, Row, Col, Button } from "antd";
import Axios from "axios";
import { get } from "https";
import { setTimeout } from "timers";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Usercontext, * as user from "../../../contexts/user-context";

//https://github.com/editorzx

const GetArray = [];
let totailSum = 0;

const History = (pastvalue: any) => {
  const [selectHistory, setselectHistory] = useState([]);
  const goback = useHistory();
  const { stateUser, dispatchUser } = useContext(Usercontext);

  // let Summary = 0;
  // for (let index = 0; index < sumtime.length; index++) {
  //   const element = sumtime[index];
  //   sumtime += element["hour"];
  // }

  let getTackingId = pastvalue.location.state.trackingId;

  const columns = [
    {
      title: "Module name",
      dataIndex: "name",
      key: "Name",
    },
    {
      title: "Start",
      dataIndex: "start_time",
      key: "start_time",
      render: (tags: string) => {
        return <Tag color={"green"}>{tags}</Tag>;
      },
    },
    {
      title: "End",
      dataIndex: "end_time",
      key: "end_time",
      render: (tags: string) => {
        return <Tag color={"red"}>{tags}</Tag>;
      },
    },
    {
      title: "Total(hour)",
      dataIndex: "sum",
      key: "sum",
    },
  ];

  let showThetime = "Time : ";

  // const CallApi = () => {
  useEffect(() => {
    if (getTackingId && typeof getTackingId == "number") {
      Axios({
        url: `http://kdxr.xyz:7777/tracking_api/tracking/GetHistory/${getTackingId}`,
        method: "GET",
      })
        .then((res) => {
          //console.log(res.data.data)
        
          if (res.data.data) {
            setInterval(function () {
              const data_first = res.data.data.data[0]
              var stime = moment(data_first.start_time);
                    var etime = data_first.end_time ? moment(data_first.end_time) : moment();
                    let start = stime.valueOf();
                    let end = etime.valueOf();
                    let Sum = end - start;
                    dispatchUser  && dispatchUser({type: 'setTimeTracking', payload: {value: Sum}});
              // set timeout every 1 second kd
              var newarray: any = [];
              var diffTime: Number;
              totailSum = 0;
              res.data.data.data.forEach(function (item: any, key: any) {
                var stime = moment(item.start_time);
                var etime = item.end_time ? moment(item.end_time) : moment();
                let start = stime.valueOf();
                let end = etime.valueOf();
                let Sum = end - start;
                totailSum += Sum; // รวมเวลาทั้งหมด

                //localStorage.setItem("showtime",Sum.toString())

                //console.log("เวลาจ้าาา", Sum);
                let hour,
                  min,
                  se = 0; //Mathเวลาให้อยู่ในช่วงของ ชั่วโมง นาที วินาที
                hour = Math.floor(
                  (Sum % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                min = Math.floor((Sum % (1000 * 60 * 60)) / (1000 * 60));
                se = Math.floor((Sum % (1000 * 60)) / 1000);

                let showingtime = ""; //เซตรูปแบบเเสดงผลของเวลาให้อยู่ในรูปแบบ 00 hour 00 minute 00 second
                if (hour) {
                  showingtime += " " + hour + " hour";
                }
                if (min) {
                  showingtime += " " + min + " minute";
                }
                if (se) {
                  showingtime += " " + se + " second";
                }
                if (showingtime == "") {
                  showingtime += "00 : 00 : 00";
                }
              
                //set time to localstorage
                //localStorage.setItem("showingtime",showingtime)
                //let showingAllpage = localStorage.getItem("showingtime")
                //console.log("โชว์ทุกหน้า",showingAllpage)
                //console.log("ชั่วโมงงงง",hour,min,se)
                //setSumtime(hour);
                newarray.push({
                  key: key,
                  name: item.name,
                  start_time: stime.format("YYYY-MM-DD HH:mm:ss"),
                  end_time: item.end_time
                    ? etime.format("YYYY-MM-DD HH:mm:ss")
                    : "",
                  sum: showingtime,
                });
              });
              setselectHistory(newarray);
              // showSum()
            }, 1000);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [getTackingId, dispatchUser]);
  //};

  const showSum = () => {
    let sumsumH = Math.floor(
      (totailSum % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let sumsumM = Math.floor((totailSum % (1000 * 60 * 60)) / (1000 * 60));
    let sumsumS = Math.floor((totailSum % (1000 * 60)) / 1000);

    let showing = "";
    if (sumsumH) {
      showing += " " + sumsumH + " hour";
    }
    if (sumsumM) {
      showing += " " + sumsumM + " minute";
    }
    if (sumsumS) {
      showing += " " + sumsumS + " second";
    }

    if (showing == "") {
      showing += "00 : 00 : 00";
    }
    let SumTo = showing;
    return "Sumary Time: " + SumTo;
    // if(Sum > 0 && typeof pid == "number")
    //   return "Sumary Cost: " + Sum.toFixed(2) + " ฿"
    // else
    //   return ""
  };
  // CallApi(); //Start UseEffects

  function Back() {
    goback.push({ pathname: "/" });
  }

  return (
    <>
      <div className="site-layout-content">
        <Row align="middle" justify="center">
          <Col span={12} style={{ marginBottom: "3vw" }}>
            <Table
              columns={columns}
              dataSource={selectHistory || []}
              footer={() => showSum()}
            />
          </Col>
        </Row>
        {/* <Row align="middle" justify="end" >
        <span style={{ marginRight: "25vw", float: "right" }}>
          <Button type="primary" htmlType="button" onClick={Back} >
            Back
          </Button>
        </span>
      </Row> */}
      </div>
    </>
  );
};
export default History;
