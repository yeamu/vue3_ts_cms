import hyRequest from '..'

export function getEntireRole() {
  return hyRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}
