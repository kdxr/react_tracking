import Axios from "axios";
import React, { useEffect, useState, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import {
  Card,
  Col,
  DatePicker,
  Row,
  InputNumber,
} from "antd";
import moment from "moment";
import { Form, Input, Button, Radio,Modal,Space } from "antd";
import { SelectProducts } from "../../../components/select-products/SelectProducts";
import { CarOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { useHistory } from "react-router-dom";
import Costdetail from "../../../components/costDetail/costDetail";
import Usercontext, * as user from "../../../contexts/user-context";


const Costfrom = () => {
  const [products, setproducts] = useState([]);
  const dateFormatList = ["YYYY-MM-DD"];
  const [costs, setcosts] = useState([]);
  const [selectproduct, setselectProduct] = useState();
  var dateCost = moment().format("YYYY-MM-DD")
  const history = useHistory();

  const [stateUser, dispatchUser] = useReducer(user.reducer, user.initState);

  const onFinish = (values: any) => {
    const checkLengthDetail =
      typeof values.detail !== "undefined" ? values.detail.length : 0;
      console.log(selectproduct, values.detail, values.cost, checkLengthDetail)
    if (
      typeof selectproduct === "number" &&
      values.detail &&
      values.cost > 0 &&
      checkLengthDetail > 10
    ) {
      console.log({
        
          ProductId: selectproduct,
          UserId : stateUser?.user.id,
          Des_data: values.detail,
          Cost: parseFloat(values.cost),
          Date_onsite: dateCost.toString(),
        
      });
      Axios({
        url: `http://kdxr.xyz:7777/tracking_api/cost/insertCost`,
        method: "PUT",
        data: {
          ProductId: selectproduct,
          UserId : stateUser?.user.id,
          Des_data: values.detail,
          Cost: parseFloat(values.cost),
          Date_onsite: dateCost.toString(),
        },
      })
        .then((res) => {
          //window.location.reload();
          Modal.success({
            content: 'บันทึกข้อมูลสำเร็จ',
            
            onOk: (e) => goto(e)
          });
          
          // console.log(res.data.data.id)
          // dispatchUser && dispatchUser({type: 'setUser', payload: {id: res.data.data.id}})
          // localStorage.setItem("user",res.data.data.id)
          // history.push({pathname:"/"})
        })
        .catch((err) => console.log(err));
        
    } else if (checkLengthDetail <= 10) {
      alert("กรุณาใส่รายละเอียดมากกว่านี้");
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  
  const goto = (e: any) =>{
    Modal.destroyAll();
    history.push({pathname:"/costdetail", state: {pdid: selectproduct}})
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    
  };

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

  // const Allcost = () =>{
  //   console.log("EVRY",selectproduct)
  //   useEffect(() => {
  //     console.log("EVRsY",selectproduct)
  //     Axios({
  //         url: `http://kdxr.xyz:7777/tracking_api/products/GetProduct`,
  //         method: 'GET'
  //           }).then((res) => {
  //           setproducts(res.data.data)
  //           }).catch((err) => console.log(err))
  //   }, [] )
  //   return costs
  // }

  const changedate = (date: any) => {
    const valueOfInput = date;
    dateCost = moment(valueOfInput).format("YYYY/MM/DD")//new Date(valueOfInput._d).toString();
  };

  function gotoCostdetail (){
    if(typeof selectproduct === "number"){
      history.push({pathname:"/costdetail", state: {pdid: selectproduct}})
    }
  }

  return (
    <div className="site-layout-content">
    
      <Row align="middle" justify="center"> 
        <Col>
          <Row style={{marginTop: "4vw"}}>
            {/* <p>Record your journey details</p> */}
          </Row>
          <Card style={{ width: "50vw" }}>
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ marginLeft: "5vw" }}
              layout="inline"
            >
              <Form.Item>
                <span style={{ marginLeft: "3.99vw" }}>
                  <SelectProducts
                    data={Allproduct()}
                    setselectProduct={setselectProduct}
                  />
                </span>
              </Form.Item>

              <Form.Item name="date">
                <span style={{ marginLeft: "2.2vw" }}>
                  <DatePicker
                    onChange={changedate}
                    defaultValue={moment()}
                    format={dateFormatList}
                    disabledDate={(d) => !d || d.isAfter(new Date())}
                  />
                </span>
              </Form.Item>

              <div style={{ marginTop: 30 }}>
                <Form.Item name="detail">
                  <TextArea
                    style={{ width: "30vw", marginLeft: "3.99vw" }}
                    placeholder="Input Detail"
                    autoSize={{ minRows: 6, maxRows: 7 }}
                  />
                </Form.Item>
              </div>

              <div style={{ marginTop: 30, marginBottom: 15 }}>
                <Form.Item name="cost">
                  <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    min={0}
                    //maxLength={7}
                    prefix="$"
                    style={{ width: "30vw", marginLeft: "3.99vw" }}
                    placeholder="input cost"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "30vw", marginLeft: "3.99vw" }}
                >
                  Submit
                </Button>
              </Form.Item>

              {/* <Button 
        style={{ width: '30vw', marginLeft: '3.99vw' }}
        type="primary"
        >
          Finish
          </Button> */}

          <Col>
        {/* <Button
                  type="dashed"
                  htmlType="button"
                  onClick={gotoCostdetail}
                  style={{ width: "30vw", marginLeft: "3.99vw", marginTop: "2vw" }}
                >
                click to detail & print
                
                </Button> */}
          </Col>
            </Form>
          </Card>
        </Col>
        

        {/* <Col span={8} offset={5}>
          <Card style={{ width: "40vw", marginRight: "2vw" }}>
            {<Costdetail pdid={selectproduct} />}
          </Card>
        </Col> */}

      </Row>
    </div>
  );
};
export default Costfrom;
