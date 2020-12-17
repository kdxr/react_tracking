import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Axios from "axios";
import { Button, Col, Row, Card, Switch, Avatar } from "antd";
import Usercontext, * as user from "../../contexts/user-context";
import { Link } from "@react-pdf/renderer";
import { useHistory } from "react-router-dom";

const Cardcompany = () => {
  const { stateUser, dispatchUser } = useContext(Usercontext);
  const [companyName, setcompanyName] = useState([]);
  console.log("comName",companyName)
  const go = useHistory();
  const history = useHistory();



  useEffect(() => {
    Axios({
      url: `http://kdxr.xyz:7777/tracking_api/tracking/GetTracking`,
      method: "PUT",
      data: { UserID: stateUser?.user.id },
    })
    .then((res)=>{
      console.log("ข้อมูล",res.data.data)
      setcompanyName(res.data.data)
    })
    .catch((err)=> console.log(err));
  },[]);

var name = String;
var idCom = Number;
const nameCom = [];

for (const key in companyName) {
  if (Object.prototype.hasOwnProperty.call(companyName, key)) {
    const element = companyName[key];
    
    //let keycheck = 0
    for (const key2 in element) {
      if (Object.prototype.hasOwnProperty.call(element, key2)) {
        const element2 = element[0];
        name = element2["company_data"]["name"]
        console.log(element2)

      //  if(keycheck === 0)
        {
          console.log("ข้อมูลชื่อ",name)
          nameCom.push(    
            <div onClick={(e) => gotoGarddetailpage(element2["company_data"]["id"])}>  
              <Card.Grid>
                  {name}
              </Card.Grid>
              </div>
          )
          break
          }
      }
    }
   // console.log("ข้อมูลชื่อ",name)
  }
}



function gotoGarddetailpage(pastidCom: Number) {
  //console.log(tkid)
  // goto.push({pathname:"/history"})
  go.push({ pathname: "/tracking", state: { CompanyId: pastidCom } });
}


function onClick() {
  history.push({ pathname: "/module" });
}

  return(
    <>
    <div>
    <Row align="middle" justify="end" 
    style={{ marginBottom: '2vw' }}
    >
        <Col span={3} >
          <Button type="primary" htmlType="button"  onClick={onClick}>
            add module
          </Button>
        </Col>
      </Row>

    <Card title="your owned companys"
    headStyle = {{background: '#EBF5FB'}}
    >
    { nameCom}
  </Card>
  </div>
    </>
  )
};
export {Cardcompany};
