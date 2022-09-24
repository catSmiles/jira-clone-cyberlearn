/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '~/App';

import { signInCyberBugsAction } from '~/redux/actions/CyberBugsActions';
import { USER_SIGN_UP_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';

function Register() {
  // const { userLogin } = useSelector((state) => state.UserReducer);
  // console.log('userLogin at pages/CyberBugs/Login: ', userLogin);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    // console.log('Received values of Register form: ', values);
    alert(JSON.stringify(values, null, 2));

    /** Action chay vo saga */
    dispatch({
      type: USER_SIGN_UP_SAGA,
      userInfo: values,
    });

    history.push('/login');

    // dispatch(signInCyberBugsAction(values));
  };

  return (
    <>
      <h3 className="text-secondary">Register</h3>
      <Form
        style={{ width: '400px ' }}
        name="normal_login"
        className="register-form"
        initialValues={{
          email: '',
          passWord: '',
          name: '',
          phoneNumber: '',
        }}
        onFinish={onFinish}
      >
        {/* name */}
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        {/* email */}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
        </Form.Item>
        {/* phoneNumber */}
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Please input your phoneNumber!',
            },
          ]}
        >
          <Input prefix={<PhoneOutlined className="site-form-item-icon" />} type="text" placeholder="Phone number" />
        </Form.Item>
        {/* passWord */}
        <Form.Item
          name="passWord"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        {/* button submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button mb-2">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Register;
