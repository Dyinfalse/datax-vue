import request from '@/utils/request'

// datax插件api

export function list(params) {
  return request({
    url: '/api/jobJdbcDatasource/list',
    method: 'get',
    params
  })
}

export function fetched(params) {
  return request({
    url: '/api/jobJdbcDatasource/' + params,
    method: 'get'
  })
}

export function updated(data) {
  return request({
    url: '/api/jobJdbcDatasource/update',
    method: 'post',
    data
  })
}

export function created(data) {
  return request({
    url: '/api/jobJdbcDatasource/add',
    method: 'post',
    data
  })
}

export function deleted(data) {
  return request({
    url: '/api/jobJdbcDatasource/delete',
    method: 'post',
    data
  })
}
