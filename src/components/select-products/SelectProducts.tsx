import React, { Component, useContext, useEffect, useState } from 'react'
import { Select } from 'antd';
import Axios from 'axios';
import { Option } from 'antd/lib/mentions';
import Module from '../../views/pages/modules'

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val: any) {
  console.log('search:', val);
}


const SelectProducts = (props: any) => {

  const onChange = (value: string)=> {
    console.log(`selected ${value}`)
    
    if(value !== null && props.setselectProduct){
      props.setselectProduct(value)
    }
  }

const onSelect = (value: any) =>{
  console.log(`selected product:  ${value}`)
  
    props.setselectProduct(value)
    if(value == null){
      
    }
}

  const {data} = props;

  
  const opproduct=[];

  for (let index = 0; index < data.length; index++) {
    opproduct.push(
      <Select.Option key={index.toString()} value={data[index].id}>{data[index].full_name}</Select.Option>
    )
  }

  useEffect(() => {
    if(props.setselectProduct)
      props.setselectProduct(document.getElementsByTagName("select"))
  }, [])
  return(
    
    <Select
      showSearch
      style={{ width: '17.5vw' }}
      placeholder="Select a product"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      defaultValue=""
  >
    <Option key="all" value="">Select Product</Option>
    {opproduct}
  </Select>
  

  )
  }


  export {SelectProducts}