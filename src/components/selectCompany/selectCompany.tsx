import React, { Component, useContext, useEffect, useState } from 'react'
import { Select } from 'antd';
import Axios from 'axios';
import { Option } from 'antd/lib/mentions';
import Module from '../../views/pages/modules'


const SelectCompany = (props: any) => {


  const onChange = (value: string)=> {
    console.log(`selected ${value}`)
    
    if(value !== null && props.setCompany){
      props.setCompany(value)
    }
  }


  const {data} = props;

  
  const opcompany=[];

  for (let index = 0; index < data.length; index++) {
    opcompany.push(
      <Select.Option key={index.toString()} value={data[index].id}>{data[index].name}</Select.Option>
    )
  }

  useEffect(() => {
    if(props.setcompanyName)
      props.setcompanyName(document.getElementsByTagName("select"))
  }, [])

  return(
    
    <Select
      showSearch
      style={{ width: '17.5vw' }}
      placeholder="Select a company"
      optionFilterProp="children"
      onChange={onChange}
      defaultValue=""
  >
    <Option key="all" value="">Select company</Option>
    {opcompany}
  </Select>
  

  )
  }


  export default SelectCompany