/*
 * @Author: EvefyouFE
 * @Date: 2023-08-21 22:29:44
 * @FilePath: \react-evefyou-app\pro\locale\en_US.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import enUS_ui from 'react-evefyou-ui/locales/en_US'
import { modules_enUS } from "./modules";
import { pages_enUS } from "./pages";

export default {
  ...enUS_ui,
  ...modules_enUS,
  ...pages_enUS,
  'common.text.ok': 'Ok',
  'sys.app.logout.tip': 'Reminder',
  'sys.app.logout.msg': 'Are you sure to log out of the system?',
  'sys.api.error.msg.401': 'User does not authenticated|(token、username、password is wrong)',
  'sys.api.error.msg.403': 'User is authorized, but access is prohibited.',
  'sys.api.error.msg.404': 'Network request error, the resource was not found!',
  'sys.api.error.msg.405': 'Network request error, request method not allowed!',
  'sys.api.error.msg.408': 'The network request timed out!',
  'sys.api.error.msg.500': 'Server error, please contact the administrator!',
  'sys.api.error.msg.501': 'The network is not implemented!',
  'sys.api.error.msg.502': 'Network Error!',
  'sys.api.error.msg.503': 'The server is unavailable, the server is temporarily overloaded or under maintenance!',
  'sys.api.error.msg.504': 'Network timeout!',
  'sys.api.error.msg.505': 'The http version does not support this request!',
  'sys.api.error.tip': 'Error message',
  'sys.api.apiRequestFailed': 'Request error, please try again later',
  'sys.api.operationSuccess': 'Successful operation',
  'sys.api.success.tip': 'Success message',
  'sys.api.timeoutMessage': 'Login timed out, please log in again!',
  'sys.api.apiTimeoutMessage': 'The interface request timed out, please refresh the page and try again!',
  'sys.api.networkExceptionMsg': 'The network is abnormal, please check whether your network connection is normal!',
};
