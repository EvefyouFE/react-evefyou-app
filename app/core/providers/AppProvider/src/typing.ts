import { Locale } from "antd/es/locale";
import React from "react";

export interface LocaleInfo {
  name: string;
  key: 'en-us' | 'zh-cn';
  icon: React.ReactNode;
  messages: Record<string, string>;
  antdMessages: Locale;
}
