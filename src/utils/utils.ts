import { keys, compact } from 'lodash'
export const filterHeader = (data: any) => {
  const allKeys = keys(data[0])
  let headerLists = allKeys.map((items) => {
    if (items !== 'id') {
      return {
        field: items,
        filter: 'agTextColumnFilter',
      }
    }
  })
  headerLists = compact(headerLists)
  console.log(headerLists)
  return headerLists
}
