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
  const [dataAll, setdataAll] = useState([]);


    useEffect(() => {
      Axios({
        url: `http://kdxr.xyz:7777/tracking_api/tracking/InfoSummaryDay`,
        data: { UserID: stateUser?.user.id, Date: DateS },
        method: "PUT",
      }) 
        .then((res) => {
          let result = res.data.data
          let ArrayofAllCompany : any = [];

          for (const key in result) { //Company List
            if (Object.prototype.hasOwnProperty.call(result, key)) {
              const element = result[key];
				let GetCompanyName = ""
				for(const keyProduct in element){ //Product List
					const elementofProduct = element[keyProduct]
					const ProductArray = [] ;
					
					for(const keyData in elementofProduct){ //Product List
						const elementofData = elementofProduct[keyData][0]
						const ModuleArray = [];
						for(const keyModule in elementofData.module_time){ //Product List
							const elementofModule = elementofData.module_time[keyModule]
							ModuleArray.push(
								<Card 
								  title={elementofData.module_name}
								  style={{ margin: '12px'}}
								  extra = {
									"module"
								  }
								  headStyle = {{background: '#EBF5FB'}}
								>
								{elementofModule.start_time}
								<br/>
								{elementofModule.end_time}
								<br/>
								{elementofModule.summary}
								</Card>
							)
						}
						ProductArray.push(
							<Row>
							<Col span={22}>
							<Card 
							  title={elementofData.product_name}
							  style={{ margin: '12px'}}
							  extra = {
								"Product"
							  }
							  headStyle = {{background: '#EBF5FB'}}
							>
								{ModuleArray}
							</Card>
							</Col>
							</Row>
						)
						GetCompanyName = elementofData.company_name ///
					}
					
					ArrayofAllCompany.push(
						
						<Col span={11}  style={{ margin: '0px 12px 12px 0px'}}>
							<Card 
							  title={GetCompanyName}
							  style={{ margin: '0px 12px 0px 12px'}}
							  extra = {
								"Company"
							  }
							  headStyle = {{background: '#EBF5FB'}}
							>
								{ProductArray}
							</Card>
						</Col>
						
					)
				}
				
				
            }
          }
        
          setdataAll(ArrayofAllCompany)
        })
        .catch((err) => console.log(err));
    },[DateS])
  return(
    <>
  <Row gutter={16} > {/*gutter={16} */}
		{dataAll} 
  </Row>
    </>
  );
};
export default  Carddetail