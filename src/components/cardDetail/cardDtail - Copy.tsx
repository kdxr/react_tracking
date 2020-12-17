import React, { useEffect, useState, useContext, useReducer } from "react";
import { Button, Col, Row, Card, Switch, Avatar, Descriptions, Tag } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Usercontext, * as user from "../../contexts/user-context";
import Meta from "antd/lib/card/Meta";
import { title } from "process";
import Title from "antd/lib/skeleton/Title";
import { SelectProducts } from "../../components/select-products/SelectProducts";



const Carddetail = (pastValue: any) => {


  const [stateUser, dispatchUser] = useReducer(user.reducer, user.initState);
  let DateS = pastValue.location.state.dateSelect1; 
  let DateE = pastValue.location.state.dateSelect2; 
  let Select = pastValue.location.state.productID;
  const [dataAll, setdataAll] = useState([]);

//console.log("เดชเอช",DateS)
//console.log("เดชอี",DateE)
// Date_To: DateE 

    useEffect(() => {
      Axios({
        url: `http://kdxr.xyz:7777/tracking_api/tracking/InfoSummaryDay`,
        data: { UserID: stateUser?.user.id, Date: DateS },
        method: "PUT",
      }) 
        .then((res) => {
          //console.log("ดาดา",res.data.data)
          let result = res.data.data
          let company : any = [];
          let product: any = [];
          let Dataa: any = [];
          let data: any = [];
          for (const key in result) {
            if (Object.prototype.hasOwnProperty.call(result, key)) {
              const element = result[key];
              //console.log("vvvvv",element)
              for (const key in element) {
                if (Object.prototype.hasOwnProperty.call(element, key)) { // product , company
                  const element2 = element[key];
                  //console.log("hhhhhhh",element2)
                  for (const key in element2) {
                    if (Object.prototype.hasOwnProperty.call(element2, key)) {
                      const element3 = element2[key];
                      //console.log("aaaa",element3)
                      for (const key in element3) {
                        if (Object.prototype.hasOwnProperty.call(element3, key)) {
                          const element4 = element3[key];
                          //console.log("เห่อออออออ",element4)
                          for (const key in element4) {
                            if (Object.prototype.hasOwnProperty.call(element4, key)) {
                              const element5 = element4[key];
                              console.log("ได้ยังvvvvv",element5)
                              // card ของ company ภายในมี card ของ Product
                              company.push(
                                <Card 
                                  title={element5.company_name}
                                  style={{ margin: '12px'}}
                                  extra = {
                                    "sumtime all product"
                                  }
                                  headStyle = {{background: '#EBF5FB'}}
                                >
                                  {product}     {/* // card of product name */}
                                </Card>
                              ); 
                            //inner card  Product data
                              product.push(
                                <Card 
                                  title={element5.product_name}
                                  style={{ margin: '12px'}}
                                  // extra = {
                                  //   "sumtime all product"
                                  // }
                                  headStyle = {{background: '#EBF5FB'}}
                                >
                                  {data}
                                </Card>
                              );
                              
                              let moduleData = element5.module_time
                                for (let index = 0; index < moduleData.length; index++) {
                                  const element6 = moduleData[index];
                                  console.log("โมมมมม",element6.summary)
                                  data.push(
                                    <>
                                    { element5.module_name } <br /> 
                                    </>
                                  )
                                }
                              
                                 //ชื่อModule
                              //   dataModulename.push(
                              //   <>
                              //   {element5.modulename}
                              //   {/* ::{changTime} */}
                              //   <br/>
                              //   </>
                              // )
                            }
                          }
                          
                        }
                      }
                      
                    }
                  }
                  // element2.list.forEach((item: any) => { //module , date
                  //   console.log(item.date)
                  //   let changTime: string = " "
                  //   if (time.days){
                  //     changTime += " " + time.days + " day"
                  //   }
                  //   if (time.hours){
                  //     changTime += " " + time.hours + " hours"
                  //   }
                  //   if (time.minutes){
                  //     changTime += " " + time.minutes + " minutes"
                  //   }
                  //   if (time.seconds){
                  //     changTime += " " + time.seconds + " seconds"
                  //   }

                
                  // });

                }
              }
              Dataa.push(
                    <>
                      {/* <Descriptions
                        
                        layout="vertical"
                        bordered
                        column={{ md: 2, sm: 2 }}
                        style={{ marginTop: "50px" }}
                      >    
                        <Descriptions.Item label="Product name">
                          {productName}
                        </Descriptions.Item>  
                        <Descriptions.Item 
                        label="module name"
                        
                        >
                          {dataA} 
                        </Descriptions.Item> 
                        <Descriptions.Item label="ผลรวมของทุก module">
                          
                        </Descriptions.Item>             
                        
                    </Descriptions> */}
                  {/* title เป็นโปรดักเนม  แสดงภายในเป็น Module  */}
                    </>
                  
                  )
            }
          }
        
          setdataAll(company)
        })
        .catch((err) => console.log(err));
    },[DateS])
  return(
    <>
  <Row gutter={16}  > {/*gutter={16} */}
      <Col span={8}>
            {dataAll}
      </Col>   
  </Row>
    </>
  );
};
export default  Carddetail