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

export const checkDomain =  () => {
  let urls: string | undefined = ''
  let numbers = 0
  if (process.env.NODE_ENV === 'development') {
    urls = process.env.REACT_APP_DEV_URL
    numbers = 8618
  } else if (process.env.NODE_ENV === 'production') {
    urls = process.env.REACT_APP_PRODUCTION_URL
    numbers = 500
  } else {
    urls = process.env.REACT_APP_DEV_URL
  }

  return { urls, numbers }
}
