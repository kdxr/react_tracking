import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Cardcompany } from '../../../components/cardCompany/cardCompany'

const CompanyList = () =>{

return(
  <>
    <div className="site-layout-content">
      <Cardcompany />
  </div>
  </>
);

};
export default  CompanyList