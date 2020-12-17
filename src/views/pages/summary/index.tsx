import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../../../contexts/user-context";
import Costdetail from "../../../components/costDetail/costDetail";
import Summary from "../../../components/Summary/summary"


const master = () =>{
  // const Test  = useContext(UserContext);
  // console.log("มาไหมมมม",Test)
  //const [products, setproducts] = useState([]);

  
    // useEffect(() => {
    //   //console.log("EVRY",selectproduct)
    //   Axios({
    //     url: `http://kdxr.xyz:7777/tracking_api/products/GetProduct`,
    //     method: "GET",
    //   })
    //     .then((res) => {
    //       setproducts(res.data.data);
          
    //     })
    //     .catch((err) => console.log(err));
    // }, []);
    // console.log("ข้อมูลโปรดักอิอิ",products)
  
  





  

  return(
    
<Summary />


  )



}
export default master
