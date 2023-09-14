import { LoginRes } from "@/common/models/auth"
import { CurrentUserRes } from "@/common/models/user"
import { mutationFetch, queryFetch, queryFetchPage } from "."
import { LoginByUsernameReq } from "@/modules/LoginForm"
import { MenuList } from "@/common/models/menu"
import { ReminderMessage, ReminderNotice, ReminderTodo } from "@/common/models/reminder"
import { Page, PageReq } from "@/common/models/base"

enum BaseApi {
  Login = '/login',
  Logout = '/logout',
  GetCurrentUser = '/current/user',
  GetCurrentMenuList = '/current/menuList',
  GetNoticeList = '/getNoticeList',
  GetMessageList = '/getMessageList',
  GetTodoList = '/getTodoList',
}

export const mutationLogin = mutationFetch<LoginRes, LoginByUsernameReq>({ url: BaseApi.Login })
export const queryLogout = queryFetch({ url: BaseApi.Logout })
export const queryGetCurrentUser = queryFetch<CurrentUserRes>({ url: BaseApi.GetCurrentUser })
export const queryGetCurrentMenuList = queryFetch<MenuList>({ url: BaseApi.GetCurrentMenuList })
export const queryGetNoticeList = queryFetchPage<Page<ReminderNotice>, PageReq>({ url: BaseApi.GetNoticeList })
export const queryGetMessageList = queryFetchPage<Page<ReminderMessage>, PageReq>({ url: BaseApi.GetMessageList })
export const queryGetTodoList = queryFetchPage<Page<ReminderTodo>, PageReq>({ url: BaseApi.GetTodoList })