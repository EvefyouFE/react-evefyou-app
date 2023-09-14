import { Avatar, Dropdown } from 'antd';
import { FC } from 'react';
import { userActionDropdownItems } from "./menu.data";
import { UserActionDropdownProps } from "./props";
import 'virtual:windi.css';
import { useDesign } from "react-evefyou-hooks/useDesign";

export const UserActionDropdown: FC<UserActionDropdownProps> = ({ className = '', face, name }) => {
  const { prefixCls } = useDesign('user-action-dropdown')
  return (
    <Dropdown
      className={prefixCls}
      menu={{ items: userActionDropdownItems }}
    >
      <div className={`${className} flex justify-center items-center`}>
        {
          face && <Avatar icon={face} />
        }
        {
          name && <span className="ml-2">{name}</span>
        }
      </div>
    </Dropdown>
  )
}
