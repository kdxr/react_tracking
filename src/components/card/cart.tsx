import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Icon, {
  CheckOutlined,
  CloseOutlined,
  ConsoleSqlOutlined,
  EditOutlined,
  EllipsisOutlined,
  FieldTimeOutlined,
  QqOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Card, Switch, Avatar } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Usercontext, * as user from "../../contexts/user-context";

//https://github.com/editorzx
const { Meta } = Card;

const Cartdata = (props: any) => {
  const history = useHistory();
  const goto = useHistory();
  const show = [];
  let companyID = props.data
  const [showModule, setshowmodule] = useState([]);
  const { stateUser, dispatchUser } = useContext(Usercontext);

  const [disabled, setDisabled] = useState(false);

  const setStatus = (tkid: number) => {
    //console.log(tkid)
    //useEffect(() => {
    setDisabled(true);
    // setTimeout(function(){
    //   ;
    // },1000)
    Axios({
      url: `http://kdxr.xyz:7777/tracking_api/tracking/SetTrackingStatus/${tkid}`,
      method: "PUT",
      data: { TrackingId: tkid },
    })
      .then((res) => {
        console.log(res.data.data)
        //window.location.href = "/"
        if (!res.data.data) alert("กำลังทำงานอื่นอยู่");

        setDisabled(false);
        //Cartdata(props)
      })
      .catch((err) => console.log(err));
    // }, [] )
  };

  const callModule = () => {};

  useEffect(() => {
    //callModule()
    Axios({
      url: `http://kdxr.xyz:7777/tracking_api/tracking/GetTracking`,
      method: "PUT",
      data: {UserID: stateUser?.user.id,CompanyId: companyID},
    })
      .then((res) => {
        console.log("getdata")
        setshowmodule(res.data.data);
        //  console.log(showModule)
      })
      .catch((err) => console.log(err));
  }, [disabled]);

  for (const key in showModule) {
    if (Object.prototype.hasOwnProperty.call(showModule, key)) {
      const element = showModule[key];
      //console.log(element)

      const data = [];
      var companyName = String;
      for (const key in element) {
        if (Object.prototype.hasOwnProperty.call(element, key)) {
          const elementcompany = element[key];
          //console.log(elementcompany["id"])

          companyName = elementcompany["company_data"]["name"];

          data.push(
          
              <Col span={8}>
            <Card
              style={{margin: '12px'}}
              //className={"product-company-card"}
              actions={[
                <EllipsisOutlined
                  key="ellipsis"
                  onClick={(e) => Goto(elementcompany["id"])}
                />,
              ]}
              extra={
                <Switch
                  disabled={disabled}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  //defaultChecked
                  checked={elementcompany["status"] == "active" ? true : false}
                  onChange={(e) => setStatus(elementcompany["id"])}
                />
              }
            >
              <Meta
                avatar={
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  //<QqOutlined />
                }
                title={elementcompany["module_data"]["name"]}
                description={elementcompany["product_data"]["full_name"]}
              />
            </Card>
            </Col>
          );
        }
      }
      show.push(
        
        <Card 
        title={companyName} 
        style={{ margin: '12px'}}
        headStyle = {{background: '#EBF5FB'}}
        >
          <Row>
          {data}
          </Row>
        </Card>
      );
    }
  }

  // for (const key in showModule) {
  //     let array = showModule
  //   if (Object.prototype.hasOwnProperty.call(array, key)) {
  //     const element = array[key];
  //       show.push(
  //         <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 2 }}>

  //           <Card
  //             style={{ width: 300, marginTop: 16 }}
  //             actions={[
  //               <EllipsisOutlined key="ellipsis" onClick={(e) => Goto(element.id)} />
  //             ]}
  //             extra={
  //                 <Switch
  //                   checkedChildren={<CheckOutlined />}
  //                   unCheckedChildren={<CloseOutlined />}
  //                   //defaultChecked
  //                   defaultChecked={element.status == "active" ? true : false}
  //                   onChange={(e) => setStatus(element.id)}
  //                 />
  //           }

  //         >
  //           <Meta
  //             avatar={
  //               <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
  //             }
  //             title={element.name}
  //             description={element.product_name}
  //           />
  //           </Card>
  //       </Col>
  //     )
  //   }
  // }

  function Goto(tkid: number) {
    //console.log(tkid)
    // goto.push({pathname:"/history"})
    goto.push({ pathname: "/history", state: { trackingId: tkid } });
  }

  function onClick() {
    history.push({ pathname: "/module" });
  }

  return (
    <>
      {/* <Row align="middle" justify="end">
        <Col span={3}>
          <Button type="primary" htmlType="button" onClick={onClick}>
            add module
          </Button>
        </Col>
      </Row> */}

      <Row align="middle" justify="center"  > {/*gutter={16} */}
      <Col span={16}>
          {show}
      </Col>
      </Row>
      
    </>
  );
};

export { Cartdata };
