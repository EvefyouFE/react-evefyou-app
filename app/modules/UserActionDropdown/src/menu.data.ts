import { Logout } from "@/modules/Logout";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React from "react";
import { formatBaseById } from "react-evefyou-common/locale";

export const userActionDropdownItems: MenuItemType[] = [
  {
    key: '1',
    label: React.createElement('a', {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: 'https://www.baidu.com'
    }, [
      formatBaseById('modules.UserActionDropdown.item.document')
    ])
  },
  {
    key: '2',
    label: formatBaseById('modules.UserActionDropdown.item.setting')
  },
  {
    key: '3',
    label: React.createElement(Logout, {
      locale: 'modules.UserActionDropdown.item.logout',
    })
  },
]