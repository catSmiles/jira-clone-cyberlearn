/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '~/App';

import { signInCyberBugsAction } from '~/redux/actions/CyberBugsActions';

function Login() {
  const { userLogin } = useSelector((state) => state.UserReducer);
  console.log('userLogin at pages/CyberBugs/Login: ', userLogin);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    /** Action chay vo saga */
    dispatch(signInCyberBugsAction(values));
  };

  return (
    <>
      <h3 className="text-secondary">Sign in</h3>
      <Form
        style={{ width: '400px ' }}
        name="normal_login"
        className="login-form"
        initialValues={{
          email: '',
          passWord: '',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button mb-2">
            Log in
          </Button>
          <p className="">
            Or <NavLink to="/register">register now!</NavLink>
          </p>
        </Form.Item>
      </Form>
    </>
  );
}

// export default Login;

export default Login;
