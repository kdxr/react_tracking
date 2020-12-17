import React, { Component, useContext, useEffect, useState, useReducer } from 'react'
import { Table, Tag, Space, Row, Col, Button } from 'antd';
import Usercontext , *  as user from '../../contexts/user-context'
import { Interface } from 'readline';
import Item from 'antd/lib/list/Item';
import { strict } from 'assert';
import { type } from 'os';

interface xxx{
  data:[],
  setmodule: Function,
}


interface recordTable {
  Id: any,
  Name: String,
  Status: String,
  key: Number
}

type idSel =  Array<String>  

  class SelectModules extends React.Component<xxx> {
  
  
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      idSelected: []
    };

  columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Module name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Status',
      key: 'Id',
      dataIndex: 'Status',
      disableCheckbox: true,

      render: (tags: string) => {
        let color = tags === 'active' ? 'green' : 'red';
        return (
          <Tag color={color}>
            {tags}
          </Tag>
        );

      }
    },
  ];

  start = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelect = (record : recordTable, bool:boolean) => {
    console.log(record.Id, bool);
    let newArr : (String | Number)[] = [...this.state.idSelected];
    if(bool){
      newArr.push(record.Id)
    }else{
      newArr = newArr.filter(n => n !== record.Id);
    }
    console.log(newArr);
    this.setState(state => {
      return {
        ...state,
        idSelected: newArr
      }
    })
  }

  onSelectChange = (selectedRowKeys: any) => {
    this.setState({ selectedRowKeys });
  };
  componentDidUpdate(){
  this.props.setmodule(this.state.idSelected)
}

  render() {

    const { loading, selectedRowKeys } = this.state;
    const {data} = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: (record: any) => ({
        disabled: record.Status === 'inactive', 
        name: record.name,
      }),
      onSelect: (record: recordTable, selected: boolean) => this.onSelect(record, selected)
    };
    const hasSelected = selectedRowKeys.length > 0;
    const data2 = [];
    for (let index = 0; index < data.length; index++) {
      const element: {id:any, name: any, status: any} = data[index];
      data2.push({
        key: index,
        Id: element.id,
        Name: element.name,
        Status: element.status
      })
    }
    const selectDataID = []
    const nameOfModule = []
    for (let index = 0; index < selectedRowKeys.length; index++) {
      for (let i = 0; i < data2.length; i++) {
        const element: {key:any,Id:string, Name: any, Status: any} = data2[i];
        if(element.key == selectedRowKeys[index]){
          selectDataID.push(element.Id)
          nameOfModule.push(element.Name)
        }  
      }
    }
    
    localStorage.setItem("selectRowItem", `${selectDataID}`);
    localStorage.setItem("nameOfModule", `${nameOfModule}`);



    return (
      <div > 
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
            <Table rowSelection={rowSelection} 
            columns={this.columns} 
            dataSource={data2} 
            pagination={{ defaultCurrent: 1, size:"small", defaultPageSize:5, showSizeChanger: false }}
            />

        
      </div>
    );
  }
}

export default SelectModules