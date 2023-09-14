/*
 * @Author: EvefyouFE
 * @Date: 2023-07-15 00:49:33
 * @FilePath: \react-evefyou-admin\src\pages\login\loginByUsername.tsx
 * @Description:
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved.
 */
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { LoginByUsernameReq } from '../typing';
import { FormattedMessage } from 'react-intl';
import { useBaseLocale } from "react-evefyou-common/locale";
import { LoginByUsernameProps } from "../props";
import 'virtual:windi.css';

export const LoginByUsername: FC<LoginByUsernameProps> = ({
  isLogging,
  onLogin,
}) => {
  const { formatById } = useBaseLocale();

  const usernamePlaceHolder = formatById('modules.LoginForm.item.username');
  const passwordPlaceHolder = formatById('modules.LoginForm.item.password');

  return (
    <Form<LoginByUsernameReq>
      onFinish={onLogin}
      style={{
        padding: '0 1.5rem',
      }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名！' }]}
      >
        <Input placeholder={usernamePlaceHolder} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码！' }]}
      >
        <Input.Password placeholder={passwordPlaceHolder} />
      </Form.Item>
      <Button
        className="w-full"
        type="primary"
        htmlType="submit"
        loading={isLogging}
      >
        <FormattedMessage id="modules.LoginForm.btn.submit" />
      </Button>
    </Form>
  );
};
