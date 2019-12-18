import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/system-manage/add-group',
    method: 'post',
    data
  })
}
