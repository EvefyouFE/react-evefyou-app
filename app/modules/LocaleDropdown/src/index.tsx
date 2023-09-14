import { TranslationOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { FC, useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { LocaleDropdownProps } from "./props";
import 'virtual:windi.css';
import { useDesign } from "react-evefyou-hooks/useDesign";
import classNames from "classnames";

export const LocaleDropdown: FC<LocaleDropdownProps> = ({
  className, onChange, items, selectedKey = 'zh-cn'
}) => {
  const { prefixCls } = useDesign('locale-dropdown')
  const [selectedKeysState, setSelectedKeysState] = useState([selectedKey])
  const onSelect = useCallback(({ key }: { key: string }) => {
    setSelectedKeysState([key])
    onChange?.(key);
  }, [onChange])
  const menuItems = items.map((v) => ({
    key: v.key,
    label: (
      <span>
        <FormattedMessage id={v.key} />
      </span>
    )
  }))
  const clsName = classNames(prefixCls, className)

  return (
    <Dropdown
      menu={{ items: menuItems, onSelect, onClick: onSelect, selectedKeys: selectedKeysState }}
      placement="bottom"
      arrow={{ pointAtCenter: true }}
      className={clsName}
    >
      <span className="cursor-pointer flex items-center">
        <TranslationOutlined />
      </span>
    </Dropdown>
  )
}
