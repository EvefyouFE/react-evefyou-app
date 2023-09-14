/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ReminderPopoverTabs } from "@modules/ReminderPopoverTabs"
import { PropsWithCls } from "react-evefyou-common"
import { useDesign } from "react-evefyou-hooks/useDesign"
import { AntdTabItem } from "react-evefyou-ui"
import classNames from 'classnames'
import { ReminderListTypeEnum } from "../typing"
import { NoticeList } from "./NoticeList"
import { MessageList } from "./MessageList"
import { TodoList } from "./TodoList"
import { formatBaseById } from "react-evefyou-common/locale"

export const Reminder: React.FC<PropsWithCls> = ({
  className
}) => {
  const items: AntdTabItem[] = [
    {
      key: ReminderListTypeEnum.notice,
      label: formatBaseById('pages.AdminPage.Reminder.notice'),
      children: <NoticeList />
    },
    {
      key: ReminderListTypeEnum.message,
      label: formatBaseById('pages.AdminPage.Reminder.message'),
      children: <MessageList />
    },
    {
      key: ReminderListTypeEnum.todo,
      label: formatBaseById('pages.AdminPage.Reminder.todo'),
      children: <TodoList />
    },
  ]
  const { prefixCls } = useDesign('reminder');
  const rootClsName = classNames(prefixCls, className);
  return (
    <ReminderPopoverTabs
      className={rootClsName}
      contentCls="w-80"
      items={items}
    />
  )
}