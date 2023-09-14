import { useMemo } from "react";
import { Tag } from "antd";
import { BasicList, BasicListItem, useListInstance } from "react-evefyou-ui/components/BasicList";
import { ReminderSection } from "@sections/ReminderSection";
import { PageReq } from "@common/models/base";
import { queryGetTodoList } from "@core/query/api";

const getStateColor = (state: number) => {
  switch (state) {
    case 1:
      return '#f50'
    case 2:
      return '#2db7f5'
    case 3:
      return '#87d068'
    case 4:
      return '#108ee9'
    case 5:
      return 'magenta'
    default:
      return '#f50'
  }
}
export const TodoList: React.FC = () => {
  const [basicListRef, { pagination }] = useListInstance()
  const paginationConfig = pagination ? pagination : {}
  const pageReq: PageReq = {
    pageNo: paginationConfig?.current ?? 1,
    pageSize: paginationConfig?.pageSize
  }
  const { data } = queryGetTodoList.useQuery({ data: pageReq });
  const dataSource: BasicListItem[] = useMemo(() => data?.resultData.map((item, idx) => ({
    key: idx.toString(),
    content: (
      <ReminderSection
        className="w-full"
        contentCls="w-full"
        showFooterTip
        title={item.title}
        text={<Tag color={getStateColor(item.state)}>{item.stateDesc}</Tag>}
        footer={item.description}
      />
    )
  })) ?? [], [data])
  return (
    <BasicList ref={basicListRef} dataSource={dataSource} />
  )
}