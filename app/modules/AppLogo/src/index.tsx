/*
 * @Author: EvefyouFE
 * @Date: 2023-08-23 17:50:39
 * @FilePath: \react-evefyou-app\pro\components\AppLogo\index.tsx
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import 'virtual:windi.css';
import classNames from 'classnames';
import { AppLogoProps } from "./props";
import { useDesign } from "react-evefyou-hooks/useDesign";

export const AppLogo: React.FC<AppLogoProps> = (props) => {
  const { prefixCls } = useDesign('app-logo')
  const { showTitle = true, className, logo, title } = props
  const rootClsName = classNames(
    prefixCls,
    'flex justify-center items-center cursor-pointer text-base transition-all duration-500',
    className,
  )
  const iconClsName = classNames(
    prefixCls.concat('-icon'),
    'flex-none flex items-center justify-center w-16'
  )
  const titleClsName = classNames(
    prefixCls.concat('-title'),
    'flex-1 font-bold transition-all duration-500 leading-normal text-white'
  )
  return (
    <div className={rootClsName}>
      <span className={iconClsName}>
        {logo}
      </span>
      {showTitle ? (
        <span className={titleClsName}>
          {title}
        </span>
      ) : null}
    </div>
  );
};

export default AppLogo;
