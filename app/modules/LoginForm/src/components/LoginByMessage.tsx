import { LoginByMessageReq } from '../typing';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { useBaseLocale } from "react-evefyou-common/locale";
import 'virtual:windi.css';

export const LoginByMessage: FC = () => {
  const { formatById } = useBaseLocale();
  const mobilePlaceHolder = formatById('modules.LoginForm.item.mobile');
  const captchaPlaceHolder = formatById('modules.LoginForm.item.captcha');
  return (
    <Form<LoginByMessageReq>
      style={{
        padding: '0 1.5rem',
      }}
    >
      <Form.Item
        name="mobile"
        rules={[{ required: true, message: '请输入手机号码！' }]}
      >
        <Input placeholder={mobilePlaceHolder} />
      </Form.Item>
      <Form.Item name="captcha">
        <div className="flex items-stretch">
          <Input placeholder={captchaPlaceHolder} />
          <Button
            type="primary"
            style={{
              marginLeft: '1rem',
            }}
          >
            {formatById('modules.LoginForm.btn.sendMessage')}
          </Button>
        </div>
      </Form.Item>
      <Button type="primary" className="w-full">
        {formatById('modules.LoginForm.btn.submit')}
      </Button>
    </Form>
  );
};
