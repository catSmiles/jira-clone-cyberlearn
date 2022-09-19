/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    <Form
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
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <p className="">
          Or <a href="#">register now!</a>
        </p>
      </Form.Item>
    </Form>
  );
}

// export default Login;

export default Login;
