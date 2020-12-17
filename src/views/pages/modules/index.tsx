import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import { Table, Tag, Space, Row, Col, Button, Alert, Modal } from 'antd';
import Axios from 'axios';
import SelectModules from '../../../components/select-modules/SelectBoxModules';
import SelectCompany from '../../../components/selectCompany/selectCompany'
import {SelectProducts } from '../../../components/select-products/SelectProducts'
import Usercontext , *  as user from '../../../contexts/user-context'
import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined,} from '@ant-design/icons';
import { Redirect, useHistory } from 'react-router-dom';



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Module = () => {
  const [modules, setmodule] = useState([])
  const [selectProduct,setselectProduct] = useState()
  const { stateUser, dispatchUser } = useContext(Usercontext);
  const [ collapsed, setcollapsed ] = useState(false);
  const [companyName, setcompanyName] = useState([])
  const [productName, setproductName] = useState([])
  const [getCompanyId, setCompany] = useState()
  const [ProductId, setProductId] = useState()
  const  onCollapse = (isCollapsed: any) => {
    setcollapsed( isCollapsed );
  };
  const history=useHistory()
  const ref1 = useRef(null);
  const SelectRowItem2 = localStorage.getItem("selectRowItem")

  const config = {
    title: 'Plase select',
    content: (
      <>
      You must select, Company and Product before submit
      </>
    ),
  };
  function onClick (){
  if(ProductId && getCompanyId){
    if(SelectRowItem2!== null) {
      const ars = SelectRowItem2.split(",")
      const convertarray = []
      for (let index = 0; index < ars.length; index++) {
        const element = ars[index];
        convertarray.push(parseInt(element))
      }
      const param = { 
        ModuleId:  convertarray, 
        UserID: stateUser?.user.id , 
        CompanyId: getCompanyId, 
        ProductId: ProductId
      };
      //console.log(param)
      Axios({
        url: `http://kdxr.xyz:7777/tracking_api/tracking/InsertTracking`,
        data: param,
        method: "PUT",
      })
        .then((res) => {
          //settracking(res.data.data.data);
          //history.push({pathname:"/module"/*, state: {selectRow: modules}*/})
          history.push({pathname:"/"})
         // console.log("set",res.data)
        })
        .catch((err) => console.log(err));
    }else{
      alert("Pls Selected")
      return false;
    }  
    
  }else{
    Modal.info(config)
  }
  
  }

  
useEffect(() => {
  const param = setselectProduct ? {UserId : stateUser?.user.id, ProductId : setselectProduct} : {UserId : stateUser?.user.id}
    Axios({
      url: `http://kdxr.xyz:7777/tracking_api/company/getalldata`,
      method: 'PUT',
        }).then((res) => {
          setselectProduct(res.data.data.module)
          setcompanyName(res.data.data.company)
          setproductName(res.data.data.product)
        }).catch((err) => console.log(err))
}, [setselectProduct,setCompany] )

  return (
      <div className="site-layout-content">
        <Row align='middle' justify='center'>
          <Col  span={16} >
          <div style={{ marginTop: 30 }}>
            {/* ----------- Select Company -------------- */}
            <SelectCompany 
            data={companyName} 
            setCompany={setCompany}
            style={{ marginRight: "40px" }}
            />
             {/* ----------- Select Product -------------- */}
            <SelectProducts
            data={productName} 
            setselectProduct={setProductId}
            style={{ marginLeft: '30vw', marginTop: 'ovw' }}
            />
            
          </div>
          </Col>
          <Col span={16} >
            <div style={{ marginBottom: 16 }}>
            <SelectModules data={selectProduct|| []} setmodule={setmodule} ref={ref1} />
            </div>
          </Col>
        </Row>
        <Row  align='middle' justify='center'>
        <Col span={16}>
          <Button type="primary" htmlType="button" onClick={onClick}  >
            Submit
          </Button>
          </Col>
        </Row>
    </div> 
  )
}
export default Module 
