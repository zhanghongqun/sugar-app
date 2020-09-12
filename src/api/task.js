import request from '@/utils/request'

export function fetchList(customerId) {
  return request({
    url: '/tasks?customerId='+customerId,
    method: 'get',

  })
}

export function fetchTask(id) {
  return request({
    url: '/tasks/' + id,
    method: 'get'
  })
}

export function receiveTask(customerId, taskId) {
  let params = {};
  params.customerId = customerId;
  params.taskId = taskId;
  return request({
    url: '/process',
    method: 'post',
    data: params
  })
}


export function submitProcess(params) {
  return request({
    url: '/process/_submit',
    method: 'put',
    data: params
  })
}

export function orders(customerId) {
  return request({
    url: '/orders?customerId=' + customerId,
    method: 'get',
  })
}

export function abandon(customerId, processId) {
  return request({
    url: 'process/_abandon',
    method: 'put',
    data: { customerId: customerId, processId: processId }
  })
}

