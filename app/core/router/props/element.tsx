import React from 'react';
import { AuthRoute } from './AuthRoute';

/**
 * 包裹认证路由
 */
function wrapAuthRoute(
  Component: React.ComponentType<any>,
): React.ComponentType<any> {
  const Comp = () => (
    <AuthRoute>
      <Component />
    </AuthRoute>
  );
  return Comp;
}

export function wrapComponent(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  return wrapAuthRoute(Component);
}

