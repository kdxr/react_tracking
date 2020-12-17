import Axios from "axios";
import React, { Component, useContext, useEffect, useState } from "react";
import Usercontext, * as user from "../../../contexts/user-context";
import selectRowItem from "../../../components/select-modules/SelectBoxModules";
import nameOfModule from "../../../components/select-modules/SelectBoxModules"
import { Button, Col, Row, Card, Switch, Avatar } from "antd";
import { useHistory } from "react-router-dom";
import { Cartdata }   from "../../../components/card/cart"


interface xxx {
  selectRow: [];
}


const Tracking = (pastValue: any) => {
  const history = useHistory();
  const { stateUser, dispatchUser } = useContext(Usercontext);
  // const { stateProduct, dispatchProduct } = useContext(Usercontext);
  const [tracking, settracking] = useState([]);
  const [selectRow, setSelectRow] = useState();
  const [showModule, setshowmodule] = useState();
  const getSelect = history.location.state;
  const SelectRowItem = localStorage.getItem("selectRowItem");
  let companyID = pastValue.location.state.CompanyId;
  const back = useHistory();
  const show = [];

  useEffect(() => {
    //setSelectRow();
    let maybeX = getSelect as xxx;
    //const param = { UserId: stateUser?.user.id, CompanyId: companyID };

    // Axios({
    //   url: `http://kdxr.xyz:7777/tracking_api/tracking/GetTracking`,
    //   method: "PUT",
    //   data: { UserID: stateUser?.user.id, CompanyId: companyID },
    // })
    //   .then((res) => {
    //     setshowmodule(res.data.data);
    //     console.log(res.data.data)
    //   })
    //   .catch((err) => console.log(err));

    //console.log(maybeX.selectRow);
    // if (maybeX.selectRow.length > 0) {
      // const param = { ModuleId: maybeX.selectRow, UserID: stateUser?.user.id };
      // Axios({
      //   url: `http://kdxr.xyz:7777/tracking_api/tracking/InsertTracking`,
      //   data: param,
      //   method: "PUT",
      // })
      //   .then((res) => {
      //     settracking(res.data.data.data);
      //     console.log("set",res)
      //   })
      //   .catch((err) => console.log(err));
    // } else {
    //   alert("Pls Selected");
    // }
  }, []);

  function  backtoCompanypage (){
    back.push({pathname: '/'})
  }
    

  return (
    
  <>
    <div className="site-layout-content">
    <Row  align='middle' justify='center' 
    style =  {{marginLeft: '1vw'}}
    >
        <Col span={16}>
          <Button 
          type="primary" 
          htmlType="button" 
          onClick={backtoCompanypage}
          >
            Back
          </Button>
          </Col>
        </Row>
      <Cartdata data={companyID} />
  </div>
  </>
    
  );
};
export default Tracking;
