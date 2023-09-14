import { BasicTabsProps } from "react-evefyou-ui/components/BasicTabs";
import { PopoverProps } from "antd";

export interface ReminderPopoverTabsProps extends PopoverProps, BasicTabsProps {
  contentCls?: string;
}