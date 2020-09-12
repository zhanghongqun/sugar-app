import request from '@/utils/request'

export function upload(file) {
    return request({
        url: '/file',
        method: 'post',
        data:file
    })
}
