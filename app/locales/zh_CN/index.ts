/*
 * @Author: EvefyouFE
 * @Date: 2023-08-16 14:28:09
 * @FilePath: \react-evefyou-app\pro\locale\zh_CN.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import zhCN_ui from 'react-evefyou-ui/locales/zh_CN'
import { pages_zhCN } from "./pages";

export default {
  ...zhCN_ui,
  ...pages_zhCN,
  'common.text.ok': '确认',
  'sys.app.logout.tip': '温馨提醒',
  'sys.app.logout.msg': '是否确认退出系统？',
  'sys.api.error.msg.401': '用户没有认证（令牌、用户名、密码错误）',
  'sys.api.error.msg.403': '用户得到授权，但访问是被禁止的。',
  'sys.api.error.msg.404': '网络请求错误，未找到该资源！',
  'sys.api.error.msg.405': '网络请求错误，请求方法未允许！',
  'sys.api.error.msg.408': '网络请求超时！',
  'sys.api.error.msg.500': '服务器错误，请联系管理员！',
  'sys.api.error.msg.501': '网络未实现！',
  'sys.api.error.msg.502': '网络错误！',
  'sys.api.error.msg.503': '服务器不可用，服务器暂时过载或维护！',
  'sys.api.error.msg.504': '网络超时！',
  'sys.api.error.msg.505': 'http版本不支持该请求！',
  'sys.api.error.tip': '错误提示',
  'sys.api.apiRequestFailed': '请求出错, 请稍后重试',
  'sys.api.operationSuccess': '操作成功',
  'sys.api.success.tip': '成功提示',
  'sys.api.timeoutMessage': '登录超时，请重新登录!',
  'sys.api.apiTimeoutMessage': '接口请求超时，请刷新页面后重试！',
  'sys.api.networkExceptionMsg': '网络异常，请检查您的网络连接是否正常！',
};
