export interface ReminderMessage {
  icon: string;
  title: string;
  description: string;
  createTime: string;
}
export interface ReminderNotice {
  icon: string;
  title: string;
  createTime: string;
}
export interface ReminderTodo {
  title: string;
  description: string;
  createTime?: string;
  state: number;
  stateDesc: string;
}