import request from '@/utils/request';

export function getAllBookType() {
    return request({
        url: '/api/bookType',
        method: 'GET',
    });
}
