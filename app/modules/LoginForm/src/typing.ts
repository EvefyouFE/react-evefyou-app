export enum LoginTypeEnum {
  username = '1',
  message = '2',
  wechat = '3',
  qq = '4'
}

export interface LoginByUsernameReq {
  username: string,
  password: string,
}
export interface LoginByMessageReq {
  mobile: string,
  captcha: string,
}
