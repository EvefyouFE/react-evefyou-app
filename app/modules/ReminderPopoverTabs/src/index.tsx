import { AlertOutlined } from '@ant-design/icons';
import { Badge, Popover } from 'antd';
import { useDesign } from 'react-evefyou-hooks/useDesign';
import './ReminderPopoverTabs.less';
import { BasicFallback, FallbackTypeEnum } from 'react-evefyou-ui/components/BasicFallback';
import { BasicTabs } from "react-evefyou-ui/components/BasicTabs";
import classNames from 'classnames';
import { FC, Suspense } from 'react';
import { ReminderPopoverTabsProps } from "./props";
import 'virtual:windi.css';

export const ReminderPopoverTabs: FC<ReminderPopoverTabsProps> = ({
  className,
  contentCls,
  items
}) => {
  const { prefixCls } = useDesign('reminder-popover-tabs');
  const rootClsName = classNames(prefixCls, className);
  const contentClsName = classNames(prefixCls.concat('-content'), contentCls)
  return (
    <Popover
      className={rootClsName}
      placement="bottom"
      content={
        <Suspense fallback={<BasicFallback fallbackType={FallbackTypeEnum.loading} />}>
          <BasicTabs items={items} className={contentClsName} />
        </Suspense>
      }
      trigger="click"
    >
      <span>
        <Badge className="inline-flex items-center h-8" dot>
          <AlertOutlined className="px-2" />
        </Badge>
      </span>
    </Popover>
  )
}
