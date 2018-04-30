// pagination.js
export const pagination = (query) => {
  let queryString = ''

  if (query.order !== null || query.limit !== null || query.offset !== null) {
    queryString += '?'
  }
  if (query.order !== null) {
    queryString += `order=${query.order}&`
  }
  if (query.limit !== null) {
    queryString += `limit=${query.limit}&`
  }
  if (query.offset !== null && query.limit !== null) {
    queryString += `offset=${query.offset}&`
  }
  if (queryString[queryString.length - 1] === '&') {
    queryString = queryString.substring(0, (queryString.length - 1))
  }
  return queryString
}
