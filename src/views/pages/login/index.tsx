import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import Usercontext , *  as user from '../../../contexts/user-context'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


const Index = () => {

  const history=useHistory()
  
  const { stateUser, dispatchUser } = useContext(Usercontext);
  //console.log(stateUser?.user.id)

    const login = () => {

    }
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    
      const onFinish = (values: any) => {
        
        Axios({
          url: `http://kdxr.xyz:7777/tracking_api/authen/login`,
          method: 'POST',
          data: { Email: values.email}
      }).then((res) => {
        //console.log("สวัสดีจ้าาาา",res.data.data)
        dispatchUser && dispatchUser({type: 'setUser', payload: {id: res.data.data.id, name: res.data.data.first_name+" "+ res.data.data.last_name}})
        localStorage.setItem("user",res.data.data.id)
        history.push({pathname:"/"})
      }).catch((err) => console.log(err))
    }
    

    // const onFinish = async(values :any) => {
    // try {
    //   const login = await Axios({
    //     method: 'get',
    //     url: `http://kdxr.xyz:7777/tracking_api/user/login`,
    //     params: {
    //         email: values.email
    //     }
    //   });
    //   const login2 = await Axios({
    //     method: 'get',
    //     url: `http://kdxr.xyz:7777/tracking_api/user/login`,
    //     params: {
    //         email: values.email
    //     }
    //   });
      
    //     dispatchUser && dispatchUser({type: 'setUser', payload: {id: login.data.id}})
    //     history.push({pathname:"/product"})
      
    // } catch (error) {
    // }
    // }
    
      const onFinishFailed = (errorInfo : any) => {
        console.log('Failed:', errorInfo);
      };

    return (
      <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

        <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email !!' }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item> */}

        {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    )
}

export default Index

