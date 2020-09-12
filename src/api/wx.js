import request from '@/utils/request'

export function getJsConfig(param) {
    let value = { url: param }
    return request({
        url: '/wx/sign',
        method: 'post',
        data: value
    })
}
