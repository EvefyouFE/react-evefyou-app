import { BasicIcon } from "react-evefyou-ui/components/BasicIcon";
import { ReminderSectionProps } from "./props";
import 'virtual:windi.css';
import { useDesign } from "react-evefyou-hooks";
import classNames from "classnames";
import { Tooltip } from "antd";

export const ReminderSection: React.FC<ReminderSectionProps> = ({
  className,
  icon,
  title,
  text,
  footer,
  iconCls,
  contentCls,
  showTitleTip = false,
  showTextTip = false,
  showFooterTip = false,
  titleCls,
  textCls,
  footerCls
}) => {
  const { prefixCls } = useDesign('reminder-section')
  const clsName = classNames(prefixCls, 'flex items-center', className)
  const iconClsName = classNames(prefixCls.concat('-icon'), 'flex-none flex items-center justify-center', iconCls)
  const contentClsName = classNames(prefixCls.concat('-content'), 'flex-1 flex flex-col', contentCls)
  const titleClsName = classNames(prefixCls.concat('-title'), 'truncate', titleCls)
  const textClsName = classNames(prefixCls.concat('-text'), 'truncate', textCls)
  const footerClsName = classNames(prefixCls.concat('-footer'), 'truncate', footerCls)
  return (
    <div className={clsName}>
      {
        icon && (
          <span className={iconClsName}>
            <BasicIcon icon={icon} />
          </span>
        )
      }
      <div className={contentClsName}>
        {
          title && showTitleTip ? (
            <Tooltip title={title} trigger="hover" className={titleClsName}>
              <span>
                {title}
              </span>
            </Tooltip>
          ) : (
            <span className={titleClsName}>
              {title}
            </span>
          )
        }
        {
          text && showTextTip ? (
            <Tooltip trigger="hover" title={text} className={textClsName}>
              <span>
                {text}
              </span>
            </Tooltip>
          ) : (
            <span className={textClsName}>
              {text}
            </span>
          )
        }
        {
          footer && showFooterTip ? (
            <Tooltip trigger="hover" title={footer} className={footerClsName}>
              <span>
                {footer}
              </span>
            </Tooltip>
          ) : (
            <span className={footerClsName}>
              {footer}
            </span>
          )
        }
      </div >
    </div >
  )
}