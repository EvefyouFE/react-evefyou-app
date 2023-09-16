import { useMemo } from "react";
import { BasicList, BasicListItem, useListInstance } from "react-evefyou-ui/components/BasicList";
import { ReminderSection } from "react-evefyou-ui/sections/ReminderSection";
import { PageReq } from "@common/models/base";
import { queryGetNoticeList } from "@/core/api";
import 'virtual:windi.css';

export const NoticeList: React.FC = () => {
  const [basicListRef, { pagination }] = useListInstance()

  const paginationConfig = pagination ? pagination : {}
  const pageReq: PageReq = {
    pageNo: paginationConfig?.current ?? 1,
    pageSize: paginationConfig?.pageSize
  }
  const { data } = queryGetNoticeList.useQuery({ data: pageReq });
  const dataSource: BasicListItem[] = useMemo(() => data?.resultData.map((item, idx) => ({
    key: idx.toString(),
    content: (
      <ReminderSection
        iconCls="w-16"
        contentCls="pl-4"
        icon={item.icon}
        title={item.title}
        footer={item.createTime}
      />
    )
  })) ?? [], [data])
  return (
    <BasicList ref={basicListRef} dataSource={dataSource} />
  )
}