import { queryGetCurrentUser, queryGetMessageList, queryGetNoticeList, queryGetTodoList } from "@core/api";
// import { queryGetCurrentMenuTreeList } from "@/api";

export interface IndexLoaderData {
  token: string;
}

/**
 * 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/require-await
export const defaultIndexLoader = async () => {
  // queryGetCurrentMenuTreeList.fetchQuery(undefined, {
  //     staleTime: Infinity
  // })
  queryGetNoticeList.fetchQuery()
  queryGetMessageList.fetchQuery()
  queryGetTodoList.fetchQuery()
  const user = await queryGetCurrentUser.getOrFetchData() as IndexLoaderData
  return user
}
