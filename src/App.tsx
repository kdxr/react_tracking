import React, { useReducer, Component, useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Route from "../src/views/pages/routes";
import Usercontext, * as user from "./contexts/user-context";
import { BrowserRouter, Link, useHistory } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Row, Col, Button } from "antd";
import { useState } from "react";
import Login from "./views/pages/login";
import Preview from "./views/pages/PDF/Document";
import { ExportOutlined } from "@ant-design/icons";
import { Tag } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayOut = () => {
  const [collapsed, setcollapsed] = useState(false);
  const onCollapse = (isCollapsed: any) => {
    setcollapsed(isCollapsed);
  };
};

function App() {
  const [stateUser, dispatchUser] = useReducer(user.reducer, user.initState);
  const [stateTimeTracking, dispatchTimeTracking] = useReducer(user.reducer, user.initState);
  const [selectRow, setSelectRow] = useState([]);
  const [disableBar, setDisableBar] = useState(false);
  const [time, setTime] = useState<string>();
  const [changTime, setChangTime] = useState<number>(0);
  const history = useHistory();

  //console.log(stateUser)
  const clearLocalStorage = () => {
    localStorage.clear();
    dispatchUser({ type: "clearUser" });
    window.location.reload(false);
  };

  const gotoTracking = () => {
    //history.push({pathname:"/"})
    window.location.href = "/";
  };

  const gotoCost = () => {
    //history.push({pathname:"/"})
    window.location.href = "/cost";
  };

  const gotoSummary = () => {
    //history.push({pathname:"/"})
    window.location.href = "/summary";
  };

  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName === "/preview") setDisableBar(true);
    else setDisableBar(false);
  }, []);

  useEffect(()=>{
    let Sum = stateUser?.timeTracking.value;
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
        setTime(showingtime)
  },[stateUser?.timeTracking.value])
  if (disableBar)
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <BrowserRouter>
          <Route />
        </BrowserRouter>
      </div>
    );
    
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <BrowserRouter>
          <Usercontext.Provider value={{ stateUser, dispatchUser }}>
            {stateUser.user.id !== 0 ? (
              <Layout className="layout">
                <Header>
                  <div className="logo" />
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[""]}
                  >
                    <Menu.Item key="1">
                      <Link to='/'>
                      Tracking
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link to='/cost'>
                      Cost
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="5"
                      icon={<ExportOutlined />}
                      style={{
                        width: "6.5vw",
                        marginRight: "0vw",
                        float: "right",
                      }}
                      onClick={clearLocalStorage}
                    >
                      {} Logout
                    </Menu.Item>

                    <Menu.Item
                      key="4"
                      style={{
                        width: "6.5vw",
                        marginRight: "3vw",
                        float: "right",
                      }}
                    >
                      {stateUser?.user.name}
                    </Menu.Item>

                    <Menu.Item key="3">
                      <Link to='/summary'>
                        Summary Time
                      </Link>
                      
                    </Menu.Item>
                  </Menu>
                </Header>
                <div style={{ marginTop: "4vw" }}>
                  <Content style={{ padding: "auto 0" }}>
                    <Route />
                  </Content>
                </div>
                <div style={{ marginTop: "1vw" }}>
                  <Footer style={{ textAlign: "center" }}>
                      <Tag 
                      color={"volcano"}>
                        {time}
                      </Tag>
                    <br />
                    
                    Tracking time 2020
                    
                  </Footer>
                </div>
              </Layout>
            ) : (
              <Login />
            )}
          </Usercontext.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
