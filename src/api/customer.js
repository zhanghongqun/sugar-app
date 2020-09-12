import request from '@/utils/request'

export function getCustomerByCode(code) {
    return request({
        url: '/customer/auth/' + code,
        method: 'get',
    })
}


export function getCustomerById(id) {
    return request({
        url: '/customer/' +id,
        method: 'get',
    })
}
